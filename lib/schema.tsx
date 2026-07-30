import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["expense", "income"]),

  amount: z.number().positive("Amount must be greater than 0"),

  category: z.enum([
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
