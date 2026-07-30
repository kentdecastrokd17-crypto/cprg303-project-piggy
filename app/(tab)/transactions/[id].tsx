import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../../styles/theme";

const AddTransaction = () => {
  const [expenseIncome, setExpenseIncome] = useState("expense");
  return (
    <View style={styles.contentContainer}>
      <View style={styles.expenseIncomeContainer}>
        <Pressable
          style={[
            styles.expenseIncomeInnerContainer,
            expenseIncome === "expense" && styles.expenseSelectedContainer,
          ]}
          onPress={() => setExpenseIncome("expense")}
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
          onPress={() => setExpenseIncome("income")}
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
  amountContainer: {},
});
