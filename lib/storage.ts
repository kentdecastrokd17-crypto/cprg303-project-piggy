import AsyncStorage from "@react-native-async-storage/async-storage";

//Storage and functions for transactions
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

//Storage and functions for goals
const GOALS_KEY = "goals";

export type Goal = {
  id: string;
  title: string;
  goalType: "budgeting" | "long-term";
  goalAmount: number;
  progressAmount: number;
  type:
    | "Food"
    | "Transport"
    | "Bills"
    | "Fun"
    | "Housing"
    | "Health"
    | "Income"
    | "Other";
};

export const addGoal = async (goal: Goal) => {
  try {
    const goals = await getGoals();

    const updatedGoals = [...goals, goal];

    await AsyncStorage.setItem(GOALS_KEY, JSON.stringify(updatedGoals));
  } catch (error) {
    console.error("Failed to add goal:", error);
  }
};

export const saveGoal = async (goal: Goal) => {
  try {
    const goals = await getGoals();

    const updatedGoals = goals.map((item) =>
      item.id === goal.id ? goal : item,
    );

    await AsyncStorage.setItem(GOALS_KEY, JSON.stringify(updatedGoals));
  } catch (error) {
    console.error("Failed to update goal:", error);
  }
};

export async function getGoals(): Promise<Goal[]> {
  try {
    const storedGoals = await AsyncStorage.getItem(GOALS_KEY);

    return storedGoals ? JSON.parse(storedGoals) : [];
  } catch (error) {
    console.error("Failed to get goals:", error);
    return [];
  }
}

export async function deleteGoal(id: string): Promise<void> {
  try {
    const storedGoals = await AsyncStorage.getItem(GOALS_KEY);

    const goals: Goal[] = storedGoals ? JSON.parse(storedGoals) : [];

    const updatedGoals = goals.filter((goal) => goal.id !== id);

    await AsyncStorage.setItem(GOALS_KEY, JSON.stringify(updatedGoals));
  } catch (error) {
    console.error("Error deleting goal:", error);
  }
}

export async function getGoalById(id: string): Promise<Goal | undefined> {
  try {
    const storedGoals = await AsyncStorage.getItem(GOALS_KEY);

    const goals: Goal[] = storedGoals ? JSON.parse(storedGoals) : [];

    return goals.find((goal) => goal.id === id);
  } catch (error) {
    console.error("Failed to get goal by id:", error);
    return undefined;
  }
}

//Storage and functions for the account / profile
const PROFILE_KEY = "profile";

export type Profile = {
  name: string;
  email: string;
  monthlyBudgetGoal: number;
  notificationsEnabled: boolean;
};

export const DEFAULT_PROFILE: Profile = {
  name: "Kent De Castro",
  email: "",
  monthlyBudgetGoal: 0,
  notificationsEnabled: true,
};

export async function getProfile(): Promise<Profile> {
  try {
    const storedProfile = await AsyncStorage.getItem(PROFILE_KEY);

    return storedProfile
      ? { ...DEFAULT_PROFILE, ...JSON.parse(storedProfile) }
      : DEFAULT_PROFILE;
  } catch (error) {
    console.error("Failed to get profile:", error);
    return DEFAULT_PROFILE;
  }
}

export const saveProfile = async (profile: Profile) => {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to save profile:", error);
  }
};

// Derives display initials from a profile's name, e.g. "Kent De Castro" -> "KD"
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "?";

  const initials = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return initials || "?";
}

// Clears all locally stored app data (transactions, goals, and profile)
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([TRANSACTIONS_KEY, GOALS_KEY, PROFILE_KEY]);
  } catch (error) {
    console.error("Failed to clear app data:", error);
  }
}
