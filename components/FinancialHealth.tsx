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
  //determine the financial score
  //income over 2Xexpenses is 100, no income is 0. rest is Income/Expense * 50
  const financialScore = () => {
    if (threeMonthIncome === 0) {
      return 0;
    } else if (threeMonthIncome > threeMonthExpense * 2) {
      return 100;
    } else {
      return Math.round(50 * (threeMonthIncome / threeMonthExpense));
    }
  };
  //determine score for use in card
  const score = financialScore();
  //develop a message based on score
  const financialMessage = () => {
    if (score >= 85) {
      return "Great - your finances are very healthy";
    } else if (score >= 60) {
      return "Good - spending is on track";
    } else if (score >= 40) {
      return "Okay - Determine necessary expenses";
    } else {
      return "Poor - review all finances";
    }
  };
  const finMessage = financialMessage();
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
          <Text style={styles.finHealthText}>{finMessage}</Text>
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
    borderRadius: 20,
  },

  circleContainer: {
    marginHorizontal: 10,
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
    fontSize: 15,
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
