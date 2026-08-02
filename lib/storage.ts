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

export const addTransaction = async (transaction: Transaction) => {
  try {
    const transactions = await getTransactions();

    const updatedTransactions = [...transactions, transaction];

    await AsyncStorage.setItem(
      TRANSACTIONS_KEY,
      JSON.stringify(updatedTransactions),
    );
  } catch (error) {
    console.error("Failed to add transaction:", error);
  }
};

export const saveTransaction = async (transaction: Transaction) => {
  try {
    const transactions = await getTransactions();

    const updatedTransactions = transactions.map((item) =>
      item.id === transaction.id ? transaction : item,
    );

    await AsyncStorage.setItem(
      TRANSACTIONS_KEY,
      JSON.stringify(updatedTransactions),
    );
  } catch (error) {
    console.error("Failed to update transaction:", error);
  }
};

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const storedTransactions = await AsyncStorage.getItem("transactions");

    return storedTransactions ? JSON.parse(storedTransactions) : [];
  } catch (error) {
    console.error("Failed to get transactions:", error);
    return [];
  }
}

export async function deleteTransaction(id: string): Promise<void> {
  try {
    const storedTransactions = await AsyncStorage.getItem(TRANSACTIONS_KEY);

    const transactions: Transaction[] = storedTransactions
      ? JSON.parse(storedTransactions)
      : [];

    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id,
    );

    await AsyncStorage.setItem(
      TRANSACTIONS_KEY,
      JSON.stringify(updatedTransactions),
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
}

export async function getTransactionById(
  id: string,
): Promise<Transaction | undefined> {
  try {
    const storedTransactions = await AsyncStorage.getItem(TRANSACTIONS_KEY);

    const transactions: Transaction[] = storedTransactions
      ? JSON.parse(storedTransactions)
      : [];

    return transactions.find((transaction) => transaction.id === id);
  } catch (error) {
    console.error("Failed to get transaction by id:", error);
    return undefined;
  }
}
