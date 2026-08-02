import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { TransactionFormData, transactionSchema } from "../../../lib/schema";
import {
  addTransaction,
  getTransactionById,
  saveTransaction,
  Transaction,
} from "../../../lib/storage";
import { transactionIcons } from "../../../lib/transactionIcons";
import { theme } from "../../../styles/theme";
const AddTransaction = () => {
  const { id } = useLocalSearchParams();

  const [expenseIncome, setExpenseIncome] = useState("expense");
  const [amount, setAmount] = useState("0.00");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [note, setNote] = useState("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      expenseOrIncome: "expense",
      amount: 0,
      type: "Food",
      date: new Date().toISOString().split("T")[0],
      note: "",
    },
  });

  const increaseAmount = () => {
    setAmount((prev) => {
      const newAmount = (parseFloat(prev) + 1).toString();
      setValue("amount", Number(newAmount));
      return newAmount;
    });
  };

  const decreaseAmount = () => {
    setAmount((prev) => {
      const newAmount = Math.max(0, parseFloat(prev) - 1).toString();
      setValue("amount", Number(newAmount));
      return newAmount;
    });
  };

  const onSubmit = async (data: TransactionFormData) => {
    const transaction: Transaction = {
      id: id === "new" ? Date.now().toString() : id.toString(),

      expenseOrIncome: data.expenseOrIncome,

      amount:
        data.expenseOrIncome === "expense"
          ? -Math.abs(data.amount)
          : Math.abs(data.amount),

      type: data.type,
      date: data.date,
      note: data.note ?? "",
    };

    if (id === "new") {
      await addTransaction(transaction);
    } else {
      await saveTransaction(transaction);
    }

    router.back();
  };
  useEffect(() => {
    const loadTransaction = async () => {
      // ADD MODE
      if (!id || id === "new") {
        return;
      }

      // EDIT MODE
      const transaction = await getTransactionById(id.toString());

      if (!transaction) {
        return;
      }

      setExpenseIncome(transaction.expenseOrIncome);
      setAmount(Math.abs(transaction.amount).toString());
      setSelectedCategory(transaction.type);
      setDate(new Date(transaction.date));
      setNote(transaction.note ?? "");

      setValue("expenseOrIncome", transaction.expenseOrIncome);
      setValue("amount", Math.abs(transaction.amount));
      setValue("type", transaction.type);
      setValue("date", transaction.date);
      setValue("note", transaction.note ?? "");
    };

    loadTransaction();
  }, [id]);
  return (
    <View style={styles.contentContainer}>
      {/* Expense / Income */}
      <View style={styles.expenseIncomeContainer}>
        <Pressable
          style={[
            styles.expenseIncomeInnerContainer,
            expenseIncome === "expense" && styles.expenseSelectedContainer,
          ]}
          onPress={() => {
            setExpenseIncome("expense");
            setValue("expenseOrIncome", "expense");
          }}
        >
          <Text
            style={[
              styles.expenseIncomeText,
              expenseIncome === "expense" && styles.expenseIncomeSelectedText,
            ]}
          >
            Expense
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.expenseIncomeInnerContainer,
            expenseIncome === "income" && styles.incomeSelectedContainer,
          ]}
          onPress={() => {
            setExpenseIncome("income");
            setValue("expenseOrIncome", "income");
          }}
        >
          <Text
            style={[
              styles.expenseIncomeText,
              expenseIncome === "income" && styles.expenseIncomeSelectedText,
            ]}
          >
            Income
          </Text>
        </Pressable>
      </View>

      {/* Amount */}
      <View style={styles.amountEntryContainer}>
        <View style={styles.dollarSignContainer}>
          <Text style={styles.dollarSignText}>$</Text>
        </View>

        <View style={styles.amountContainer}>
          <TextInput
            style={styles.amountText}
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
              setValue("amount", Number(text));
            }}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={theme.colors.colorTextMuted}
          />

          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount.message}</Text>
          )}
        </View>

        <View style={styles.arrowContainer}>
          <Pressable onPress={increaseAmount}>
            <Text style={styles.arrowText}>▲</Text>
          </Pressable>

          <Pressable onPress={decreaseAmount}>
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

      {/* Date */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Date</Text>

        <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.inputText}>
            {date.toISOString().split("T")[0]}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);

              if (selectedDate) {
                setDate(selectedDate);
                setValue("date", selectedDate.toISOString().split("T")[0]);
              }
            }}
          />
        )}
      </View>

      {/* Note */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Note (optional)</Text>

        <TextInput
          style={[styles.input, styles.noteInput]}
          value={note}
          onChangeText={(text) => {
            setNote(text);
            setValue("note", text);
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

export default AddTransaction;

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
