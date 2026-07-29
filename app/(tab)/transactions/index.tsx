import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import TransactionCard from "../../../components/TransactionCard";
import { theme } from "../../../styles/theme";

//for testing
const TRANSACTIONS = [
  { title: "Co-op Groceries", type: "Food", date: "Today", amount: -46.8 },
  { title: "Paycheque", type: "Income", date: "Yesterday", amount: 980.0 },
  { title: "Transit Pass", type: "Transport", date: "Jul 21", amount: -112 },
];

const index = () => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.recentTransactionsContainer}>
        <FlatList
          data={TRANSACTIONS}
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
    flex: 1,
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
  },
});
