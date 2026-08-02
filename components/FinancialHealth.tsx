import CircleProgress from "@/components/CircleProgress";
import { getTransactions, Transaction } from "@/lib/storage";
import { theme } from "@/styles/theme";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const FinancialHealth = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadTransactions = async () => {
        try {
          const storedTransactions = await getTransactions();

          setTransactions(storedTransactions);
        } catch (error) {
          console.error("Failed to load transactions:", error);
        }
      };

      loadTransactions();
    }, []),
  );
  // Find transactions from the last 3 months
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    return transactionDate >= threeMonthsAgo;
  });
  // add up all income for last 3 months
  const threeMonthIncome = filteredTransactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);

  // add up all expenses for last 3 months
  const threeMonthExpense = filteredTransactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => {
      return total + Math.abs(transaction.amount);
    }, 0);
  const financialScore = () => {
    if (threeMonthIncome === 0) {
      return 0;
    } else if (threeMonthIncome > threeMonthExpense * 2) {
      return 100;
    } else {
      return Math.round(50 * (threeMonthIncome / threeMonthExpense));
    }
  };
  const score = financialScore();

  return (
    <View style={styles.card}>
      <View style={styles.circleContainer}>
        <View style={styles.circleContainer}>
          <CircleProgress
            percentage={score}
            size={60}
            strokeWidth={5}
            progressColor={theme.colors.colorSuccess}
            backgroundColor={theme.colors.colorBg}
          />
        </View>
      </View>

      <View style={styles.innerCard}>
        <View style={styles.finHealthContainer}>
          <Text style={styles.finHealthText}>Financial Health</Text>
        </View>

        <View style={styles.finHealthScoreContainer}>
          <Text style={styles.finHealthScoreText}>{score}</Text>
          <Text style={styles.finHealthScoreOutOfText}>/100</Text>
        </View>

        <View style={styles.finHealthGradeContainer}>
          <Text style={styles.finHealthText}>
            Tracking your financial activity
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FinancialHealth;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.colorSurface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.colorTextMuted,
    height: 120,
    flexDirection: "row",
    alignItems: "center",
  },

  circleContainer: {
    marginLeft: 10,
    marginRight: 20,
  },

  circleIcon: {
    height: 60,
    width: 60,
    flexShrink: 0,
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: theme.colors.colorSurface,
    borderWidth: 5,
    borderColor: theme.colors.colorBg,
  },

  innerCard: {
    flexDirection: "column",
  },

  finHealthContainer: {},

  finHealthText: {
    fontSize: 16,
    color: theme.colors.colorTextMuted,
  },

  finHealthScoreContainer: {
    flexDirection: "row",
  },

  finHealthScoreText: {
    color: theme.colors.colorPrimary,
    fontWeight: "700",
    fontSize: 40,
  },

  finHealthScoreOutOfText: {
    paddingTop: 25,
    color: theme.colors.colorTextMuted,
  },

  finHealthGradeContainer: {},
});
