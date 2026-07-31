import { z } from "zod";

export const transactionSchema = z.object({
  expenseOrIncome: z.enum(["expense", "income"]),

  amount: z
    .number({
      message: "Amount must be a valid number",
    })
    .min(0, {
      message: "Amount cannot be negative",
    }),

  type: z.enum([
    "Food",
    "Transport",
    "Bills",
    "Fun",
    "Housing",
    "Health",
    "Income",
    "Other",
  ]),

  date: z.string(),

  note: z.string().max(200, "Note is over 200 character maximum").optional(),
});
export type TransactionFormData = z.infer<typeof transactionSchema>;
