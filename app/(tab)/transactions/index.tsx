"use client";

import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
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
import { get, STORAGE_KEYS } from "../../../lib/storage";
import { theme } from "../../../styles/theme";

const index = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedType, setSelectedType] = useState("All");
  const [transactions, setTransactions] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadTransactions = async () => {
        const storedTransactions =
          (await get<any[]>(STORAGE_KEYS.TRANSACTIONS)) ?? [];

        setTransactions(storedTransactions);
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

export default index;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.colorBg,
  },
  transactionBarContainer: {
    height: 50,
  },
  transactionBarTypeContainer: {
    padding: 15,
    borderWidth: 0.5,
    backgroundColor: "#ffffff",
    height: 30,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionBarTypeText: {
    fontSize: 15,
    color: theme.colors.colorTextMuted,
  },
  transactionBarTypeSelectedContainer: {
    padding: 15,
    borderWidth: 0.5,
    backgroundColor: theme.colors.colorPrimary,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 50,
    paddingBottom: 10,
    color: "#ffffff",
  },
});
