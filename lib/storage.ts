import AsyncStorage from "@react-native-async-storage/async-storage";

const TRANSACTIONS_KEY = "transactions";

export type Transaction = {
  id: string;
  expenseOrIncome: "expense" | "income";
  amount: number;
  type: string;
  date: string;
  note: string;
};

export async function saveTransaction(transaction: Transaction) {
  try {
    const existing = await AsyncStorage.getItem(TRANSACTIONS_KEY);

    const transactions: Transaction[] = existing ? JSON.parse(existing) : [];

    transactions.push(transaction);

    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error("Failed to save transaction:", error);
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to get transactions:", error);
    return [];
  }
}
