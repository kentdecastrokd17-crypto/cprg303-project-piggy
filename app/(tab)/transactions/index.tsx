"use client";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TransactionCard from "../../../components/TransactionCard";
import { theme } from "../../../styles/theme";

//for testing
const TRANSACTIONS = [
  { title: "Co-op Groceries", type: "Food", date: "2026-07-29", amount: -46.8 },
  { title: "Paycheque", type: "Income", date: "2026-07-28", amount: 980.0 },
  {
    title: "Transit Pass",
    type: "Transport",
    date: "2026-07-27",
    amount: -112,
  },
  { title: "Netflix", type: "Fun", date: "2026-07-25", amount: -19.99 },
  {
    title: "Electricity Bill",
    type: "Bills",
    date: "2026-07-23",
    amount: -86.45,
  },
  { title: "Rent Payment", type: "Housing", date: "2026-07-01", amount: -850 },
  { title: "Pharmacy", type: "Health", date: "2026-06-29", amount: -32.5 },
  { title: "Coffee Shop", type: "Food", date: "2026-06-27", amount: -5.75 },
  {
    title: "Gas Station",
    type: "Transport",
    date: "2026-06-25",
    amount: -62.4,
  },
  {
    title: "Freelance Payment",
    type: "Income",
    date: "2026-06-22",
    amount: 450.0,
  },
  { title: "Movie Tickets", type: "Fun", date: "2026-06-20", amount: -28 },
  { title: "Internet Bill", type: "Bills", date: "2026-06-18", amount: -79.99 },
  {
    title: "Home Supplies",
    type: "Housing",
    date: "2026-06-15",
    amount: -45.25,
  },
  {
    title: "Gym Membership",
    type: "Health",
    date: "2026-07-12",
    amount: -39.99,
  },
  { title: "Grocery Store", type: "Food", date: "2026-06-10", amount: -83.6 },
  { title: "Bus Fare", type: "Transport", date: "2026-06-08", amount: -24 },
  { title: "Paycheque", type: "Income", date: "2026-06-05", amount: 980.0 },
  {
    title: "Video Game Purchase",
    type: "Fun",
    date: "2026-05-29",
    amount: -59.99,
  },
  { title: "Water Bill", type: "Bills", date: "2026-05-27", amount: -41.2 },
  { title: "Rent Payment", type: "Housing", date: "2026-05-01", amount: -850 },
  { title: "Doctor Visit", type: "Health", date: "2026-05-25", amount: -75 },
  {
    title: "Restaurant Dinner",
    type: "Food",
    date: "2026-05-22",
    amount: -64.3,
  },
  { title: "Car Wash", type: "Transport", date: "2026-05-20", amount: -18 },
  { title: "Tax Refund", type: "Income", date: "2026-05-18", amount: 320.0 },
  { title: "Concert Ticket", type: "Fun", date: "2026-05-15", amount: -120 },
  { title: "Phone Bill", type: "Bills", date: "2026-05-12", amount: -55.0 },
  {
    title: "Furniture Purchase",
    type: "Housing",
    date: "2026-05-10",
    amount: -240,
  },
  { title: "Prescription", type: "Health", date: "2026-05-08", amount: -22.75 },
  { title: "Farmers Market", type: "Food", date: "2026-05-05", amount: -37.4 },
  { title: "Parking Fee", type: "Transport", date: "2026-05-03", amount: -12 },
];

const index = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedType, setSelectedType] = useState("All");
  //filtering the list of transactions so selected month is considered
  const filteredTransactions = TRANSACTIONS.filter((transaction) => {
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
      <Pressable style={styles.addTransactionButtonContainer}>
        <Text style={styles.addTransactionButtonText}>+</Text>
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
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
