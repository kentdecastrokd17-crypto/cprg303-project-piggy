import { zodResolver } from "@hookform/resolvers/zod";

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { GoalFormData, goalSchema } from "../../../lib/schema";
import { addGoal, getGoalById, Goal, saveGoal } from "../../../lib/storage";
import { transactionIcons } from "../../../lib/transactionIcons";
import { theme } from "../../../styles/theme";
const AddGoal = () => {
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [goalType, setGoalType] = useState("");
  const [goalAmount, setGoalAmount] = useState("0.00");
  const [progressAmount, setProgressAmount] = useState("0.00");
  const [selectedCategory, setSelectedCategory] = useState("Food");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: "",
      goalType: "budgeting",
      goalAmount: 0,
      progressAmount: 0,
      type: "Food",
    },
  });

  const increaseGoalAmount = () => {
    setGoalAmount((prev) => {
      const newGoalAmount = (parseFloat(prev) + 1).toString();
      setValue("goalAmount", Number(newGoalAmount));
      return newGoalAmount;
    });
  };

  const decreaseGoalAmount = () => {
    setGoalAmount((prev) => {
      const newGoalAmount = Math.max(0, parseFloat(prev) - 1).toString();
      setValue("goalAmount", Number(newGoalAmount));
      return newGoalAmount;
    });
  };

  const increaseProgressAmount = () => {
    setProgressAmount((prev) => {
      const newProgressAmount = (parseFloat(prev) + 1).toString();
      setValue("progressAmount", Number(newProgressAmount));
      return newProgressAmount;
    });
  };

  const decreaseProgressAmount = () => {
    setProgressAmount((prev) => {
      const newProgressAmount = Math.max(0, parseFloat(prev) - 1).toString();
      setValue("progressAmount", Number(newProgressAmount));
      return newProgressAmount;
    });
  };

  const onSubmit = async (data: GoalFormData) => {
    const goal: Goal = {
      id: id === "new" ? Date.now().toString() : id.toString(),
      title: data.title,
      goalType: data.goalType,
      goalAmount: data.goalAmount,
      progressAmount: data.progressAmount,
      type: data.type,
    };

    if (id === "budgeting" || id === "long-term") {
      await addGoal(goal);
    } else {
      await saveGoal(goal);
    }

    router.back();
  };
  useEffect(() => {
    const loadGoal = async () => {
      // ADD MODE
      if (!id || id === "budgeting" || id === "long-term") {
        setGoalType(id);
        return;
      }

      // EDIT MODE
      const goal = await getGoalById(id.toString());

      if (!goal) {
        return;
      }

      setTitle(goal.title ?? "");
      setGoalType(goal.goalType);
      setGoalAmount(Math.abs(goal.goalAmount).toString());
      setProgressAmount(Math.abs(goal.progressAmount).toString());
      setSelectedCategory(goal.type);

      setValue("title", goal.title ?? "");
      setValue("goalType", goal.goalType);
      setValue("goalAmount", Math.abs(goal.goalAmount));
      setValue("progressAmount", Math.abs(goal.progressAmount));
      setValue("type", goal.type);
    };

    loadGoal();
  }, [id]);
  return (
    <View style={styles.contentContainer}>
      {/* Goal Amount */}
      <View style={styles.amountEntryContainer}>
        <View style={styles.dollarSignContainer}>
          <Text style={styles.dollarSignText}>$</Text>
        </View>

        <View style={styles.amountContainer}>
          <TextInput
            style={styles.amountText}
            value={goalAmount}
            onChangeText={(text) => {
              setGoalAmount(text);
              setValue("goalAmount", Number(text));
            }}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={theme.colors.colorTextMuted}
          />

          {errors.goalAmount && (
            <Text style={styles.errorText}>{errors.goalAmount.message}</Text>
          )}
        </View>

        <View style={styles.arrowContainer}>
          <Pressable onPress={increaseGoalAmount}>
            <Text style={styles.arrowText}>▲</Text>
          </Pressable>

          <Pressable onPress={decreaseGoalAmount}>
            <Text style={styles.arrowText}>▼</Text>
          </Pressable>
        </View>
      </View>

      {/* Progress Amount */}
      <View style={styles.amountEntryContainer}>
        <View style={styles.dollarSignContainer}>
          <Text style={styles.dollarSignText}>$</Text>
        </View>

        <View style={styles.amountContainer}>
          <TextInput
            style={styles.amountText}
            value={progressAmount}
            onChangeText={(text) => {
              setProgressAmount(text);
              setValue("progressAmount", Number(text));
            }}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={theme.colors.colorTextMuted}
          />

          {errors.progressAmount && (
            <Text style={styles.errorText}>
              {errors.progressAmount.message}
            </Text>
          )}
        </View>

        <View style={styles.arrowContainer}>
          <Pressable onPress={increaseProgressAmount}>
            <Text style={styles.arrowText}>▲</Text>
          </Pressable>

          <Pressable onPress={decreaseProgressAmount}>
            <Text style={styles.arrowText}>▼</Text>
          </Pressable>
        </View>
      </View>

      {/* Category */}
      <Text style={styles.inputLabel}>Category</Text>

      <View style={styles.categoriesContainer}>
        {transactionIcons.map((category: (typeof transactionIcons)[number]) => (
          <Pressable
            key={category.name}
            style={[
              styles.categoryContainer,
              selectedCategory === category.name &&
                styles.selectedCategoryContainer,
            ]}
            onPress={() => {
              setSelectedCategory(category.name);
              setValue("type", category.name);
            }}
          >
            <View
              style={[
                styles.categoryIconContainer,
                selectedCategory === category.name &&
                  styles.selectedCategoryIconContainer,
              ]}
            >
              <Text style={styles.categoryIconText}>{category.icon}</Text>
            </View>

            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name &&
                  styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Title */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Note (optional)</Text>

        <TextInput
          style={[styles.input, styles.noteInput]}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setValue("title", text);
          }}
          placeholder="e.g. weekly groceries from co-op..."
          placeholderTextColor={theme.colors.colorTextMuted}
          multiline
        />
      </View>

      {/* Submit */}
      <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitText}>Save Transaction</Text>
      </Pressable>
    </View>
  );
};

export default AddGoal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.colorBg,
  },

  expenseIncomeContainer: {
    width: "100%",
    backgroundColor: theme.colors.colorBorder,
    height: 40,
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
  },

  expenseIncomeInnerContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  expenseSelectedContainer: {
    backgroundColor: theme.colors.colorExpense,
  },

  incomeSelectedContainer: {
    backgroundColor: theme.colors.colorSuccess,
  },

  expenseIncomeText: {
    color: theme.colors.colorTextMuted,
    fontSize: 17,
    fontWeight: "500",
  },

  expenseIncomeSelectedText: {
    color: theme.colors.colorSurface,
  },

  amountEntryContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
  },

  dollarSignContainer: {
    justifyContent: "center",
  },

  dollarSignText: {
    color: theme.colors.colorTextMuted,
    fontSize: 24,
    fontWeight: "500",
  },

  amountContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  amountText: {
    color: theme.colors.colorTextMuted,
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    width: "100%",
  },

  arrowContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },

  arrowText: {
    color: theme.colors.colorTextMuted,
    fontSize: 20,
  },

  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },

  categoryContainer: {
    width: "23%",
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.colorBorder,
    backgroundColor: theme.colors.colorSurface,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedCategoryContainer: {
    backgroundColor: theme.colors.colorSurface,
    borderColor: theme.colors.colorAccent,
  },

  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.colorBg,
  },

  selectedCategoryIconContainer: {
    backgroundColor: theme.colors.colorAccent,
  },

  categoryIconText: {
    fontSize: 24,
  },

  categoryText: {
    fontSize: 12,
    color: theme.colors.colorTextMuted,
    fontWeight: "500",
    paddingTop: 3,
  },

  selectedCategoryText: {
    color: theme.colors.colorAccent,
  },

  inputContainer: {
    marginTop: 20,
  },

  inputLabel: {
    color: theme.colors.colorPrimary,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.colorBorder,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  inputText: {
    color: theme.colors.colorText,
  },

  noteInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 10,
    color: theme.colors.colorText,
  },

  submitButton: {
    marginTop: 20,
    backgroundColor: theme.colors.colorAccent,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  submitText: {
    color: theme.colors.colorSurface,
    fontWeight: "600",
    fontSize: 16,
  },
});
