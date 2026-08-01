import AsyncStorage from "@react-native-async-storage/async-storage";

const TRANSACTIONS_KEY = "transactions";

export type Transaction = {
  id: string;
  expenseOrIncome: "expense" | "income";
  amount: number;
  type:
    | "Food"
    | "Transport"
    | "Bills"
    | "Fun"
    | "Housing"
    | "Health"
    | "Income"
    | "Other";
  date: string;
  note: string;
};

export async function saveTransaction(transaction: Transaction) {
  try {
    console.log("Saving transaction:", transaction);

    const storedTransactions = await AsyncStorage.getItem(TRANSACTIONS_KEY);

    console.log("Existing storage:", storedTransactions);

    const transactions: Transaction[] = storedTransactions
      ? JSON.parse(storedTransactions)
      : [];

    transactions.push(transaction);

    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error("Error saving transaction:", error);
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const storedTransactions = await AsyncStorage.getItem("transactions");

    return storedTransactions ? JSON.parse(storedTransactions) : [];
  } catch (error) {
    console.error("Failed to get transactions:", error);
    return [];
  }
}
