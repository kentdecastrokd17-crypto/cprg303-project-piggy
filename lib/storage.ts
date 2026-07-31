import AsyncStorage from "@react-native-async-storage/async-storage";

const TRANSACTIONS_KEY = "transactions";

export const saveTransactions = async (transactions: any[]) => {
  await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const getTransactions = async () => {
  const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);

  if (!data) return [];

  return JSON.parse(data);
};
