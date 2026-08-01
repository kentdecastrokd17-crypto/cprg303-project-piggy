"use client";

import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TransactionCard from "../../../components/TransactionCard";
import { getTransactions, Transaction } from "../../../lib/storage";
import { theme } from "../../../styles/theme";

const Transactions = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedType, setSelectedType] = useState("All");
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
  //filtering the list of transactions so selected month is considered
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    const matchesDate =
      transactionDate.getFullYear() === year &&
      transactionDate.getMonth() === month;

    const matchesType =
      selectedType === "All" || transaction.type === selectedType;

    return matchesDate && matchesType;
  });
  const transactionTypes = [
    "All",
    "Food",
    "Transport",
    "Bills",
    "Fun",
    "Housing",
    "Health",
    "Income",
    "Other",
  ];
  return (
    <View style={styles.contentContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.transactionBarContainer}
      >
        {transactionTypes.map((type) => (
          <Pressable
            key={type}
            style={[
              styles.transactionBarTypeContainer,
              selectedType === type &&
                styles.transactionBarTypeSelectedContainer,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.transactionBarTypeText,
                selectedType === type && styles.transactionBarSelectedTypeText,
              ]}
            >
              {type}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.recentTransactionsContainerHeader}>
        <Pressable>
          <Text style={styles.recentTransactionContainerHeaderDateText}>
            {new Date(year, month).toLocaleString("default", {
              month: "long",
            })}{" "}
            {year}
          </Text>
        </Pressable>
        <Text style={styles.recentTransactionContainerHeaderNumberOfText}>
          {filteredTransactions.length} Transactions
        </Text>
      </View>
      <View style={styles.recentTransactionsContainer}>
        <FlatList
          data={filteredTransactions.slice(0, 5)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
        />
      </View>
      <Pressable
        style={styles.addTransactionButtonContainer}
        onPress={() => router.push("/transactions/new")}
      >
        <Text style={styles.addTransactionButtonText}>+</Text>
      </Pressable>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.colorBg,
  },
  transactionBarContainer: {
    height: 50,
  },
  transactionBarTypeContainer: {
    paddingHorizontal: 15,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    backgroundColor: "#ffffff",
  },
  transactionBarTypeText: {
    fontSize: 15,
    color: theme.colors.colorTextMuted,
  },
  transactionBarTypeSelectedContainer: {
    paddingHorizontal: 15,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    backgroundColor: theme.colors.colorPrimary,
  },
  transactionBarSelectedTypeText: {
    fontSize: 15,
    color: "#ffffff",
  },
  recentTransactionsContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  recentTransactionContainerHeaderDateText: {
    fontSize: 16,
    color: theme.colors.colorPrimary,
    fontWeight: "500",
  },
  recentTransactionContainerHeaderNumberOfText: {
    fontSize: 14,
    color: theme.colors.colorTextMuted,
  },
  recentTransactionsContainer: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingBottom: 20,
    paddingTop: 20,
    width: "95%",
    alignSelf: "center",
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.colorTextMuted,
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
    marginTop: 5,
  },
  addTransactionButtonText: {
    fontSize: 32,
    color: "#ffffff",
    lineHeight: 32,
  },
});
