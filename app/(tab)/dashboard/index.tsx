"use client";

import CircleProgress from "@/components/CircleProgress";
import Header from "@/components/Header";
import TransactionCard from "@/components/TransactionCard";
import {
  deleteTransaction,
  getInitials,
  getProfile,
  getTransactions,
  Profile,
  Transaction,
} from "@/lib/storage";
import { theme } from "@/styles/theme";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Dashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const [storedProfile, storedTransactions] = await Promise.all([
            getProfile(),
            getTransactions(),
          ]);

          setProfile(storedProfile);
          setTransactions(storedTransactions);
        } catch (error) {
          console.error("Failed to load dashboard data:", error);
        }
      };

      loadData();
    }, []),
  );

  //retrieve time for hello message
  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "GOOD MORNING";
    } else if (hour < 18) {
      return "GOOD AFTERNOON";
    } else {
      return "GOOD EVENING";
    }
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const thisMonthTransactions = transactions.filter((transaction) => {
    const [transactionYear, transactionMonth] = transaction.date
      .split("-")
      .map(Number);

    return (
      transactionYear === currentYear && transactionMonth - 1 === currentMonth
    );
  });

  const monthIncome = thisMonthTransactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const monthExpenses = thisMonthTransactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  const monthlyBudgetGoal = profile?.monthlyBudgetGoal ?? 0;
  const budgetRemaining = monthlyBudgetGoal - monthExpenses;
  const budgetPercentage =
    monthlyBudgetGoal > 0
      ? Math.min(100, Math.round((monthExpenses / monthlyBudgetGoal) * 100))
      : 0;

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);

      setTransactions((currentTransactions) =>
        currentTransactions.filter((transaction) => transaction.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <>
      <Header
        headerInfo={{
          title: getGreeting(),
          subtitle: profile?.name.split(" ")[0] || "there",
          initials: getInitials(profile?.name ?? ""),
        }}
      />

      <View style={styles.contentContainer}>
        {/* Monthly budget gauge */}
        <View style={styles.budgetCard}>
          <CircleProgress
            percentage={budgetPercentage}
            size={64}
            strokeWidth={6}
            progressColor={theme.colors.colorAccent}
            backgroundColor={theme.colors.colorBg}
          />

          <View style={styles.budgetCopy}>
            <Text style={styles.budgetLabel}>
              {monthlyBudgetGoal > 0
                ? `${now.toLocaleString("default", { month: "long" })} budget`
                : "No monthly budget set"}
            </Text>

            {monthlyBudgetGoal > 0 ? (
              <>
                <Text style={styles.budgetAmount}>
                  ${monthExpenses.toFixed(2)}{" "}
                  <Text style={styles.budgetAmountMuted}>
                    of ${monthlyBudgetGoal.toFixed(2)} spent
                  </Text>
                </Text>
                <Text style={styles.budgetSub}>
                  {budgetRemaining >= 0
                    ? `$${budgetRemaining.toFixed(2)} left this month`
                    : `$${Math.abs(budgetRemaining).toFixed(2)} over budget`}
                </Text>
              </>
            ) : (
              <Pressable onPress={() => router.push("/account")}>
                <Text style={styles.budgetSetLink}>Set one in Account →</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Income / expense summary */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryTile, styles.summaryTileIncome]}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={[styles.summaryValue, styles.summaryValueIncome]}>
              ${monthIncome.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.summaryTile, styles.summaryTileExpense]}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryValue, styles.summaryValueExpense]}>
              ${monthExpenses.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Recent transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent transactions</Text>
          <Pressable onPress={() => router.push("/transactions")}>
            <Text style={styles.viewAllText}>View all</Text>
          </Pressable>
        </View>

        <View style={styles.recentTransactionsContainer}>
          {recentTransactions.length === 0 ? (
            <Text style={styles.emptyText}>
              No transactions yet — tap + to add your first one.
            </Text>
          ) : (
            recentTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onDelete={handleDelete}
              />
            ))
          )}
        </View>

        <Pressable
          style={styles.addTransactionButtonContainer}
          onPress={() => router.push("/transactions/new")}
        >
          <Text style={styles.addTransactionButtonText}>+</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.colorBg,
  },

  budgetCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.colorPrimary,
    borderRadius: 25,
    padding: 20,
    marginHorizontal: 10,
    gap: 16,
  },

  budgetCopy: {
    flex: 1,
  },

  budgetLabel: {
    color: "#ffffff",
    opacity: 0.75,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  budgetAmount: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },

  budgetAmountMuted: {
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.8,
  },

  budgetSub: {
    color: "#ffffff",
    opacity: 0.85,
    fontSize: 13,
    marginTop: 2,
  },

  budgetSetLink: {
    color: theme.colors.colorAccent,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 6,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    marginHorizontal: 10,
  },

  summaryTile: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.colorTextMuted,
    borderRadius: 16,
    padding: 14,
  },

  summaryTileIncome: {},
  summaryTileExpense: {},

  summaryLabel: {
    fontSize: 12,
    color: theme.colors.colorTextMuted,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },

  summaryValueIncome: {
    color: theme.colors.colorSuccess,
  },

  summaryValueExpense: {
    color: theme.colors.colorExpense,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 25,
    marginHorizontal: 10,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: theme.colors.colorPrimary,
  },

  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.colorAccentDark,
  },

  recentTransactionsContainer: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    width: "95%",
    alignSelf: "center",
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.colorTextMuted,
    overflow: "hidden",
  },

  emptyText: {
    color: theme.colors.colorTextMuted,
    textAlign: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  addTransactionButtonContainer: {
    backgroundColor: theme.colors.colorAccent,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 15,
    marginBottom: 10,
  },

  addTransactionButtonText: {
    fontSize: 32,
    color: "#ffffff",
    lineHeight: 32,
  },
});
