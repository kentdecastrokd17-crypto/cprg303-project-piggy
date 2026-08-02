export const transactionIcons = [
  {
    name: "Food",
    icon: "🛒",
  },
  {
    name: "Transport",
    icon: "🚌",
  },
  {
    name: "Bills",
    icon: "💡",
  },
  {
    name: "Fun",
    icon: "🎬",
  },
  {
    name: "Housing",
    icon: "🏠",
  },
  {
    name: "Health",
    icon: "❤️",
  },
  {
    name: "Income",
    icon: "💼",
  },
  {
    name: "Other",
    icon: "➕",
  },
] as const;

export type TransactionIcon = (typeof transactionIcons)[number]["name"];
