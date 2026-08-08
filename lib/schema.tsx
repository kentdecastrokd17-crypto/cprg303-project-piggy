import { z } from "zod";

//schema for transaction form
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

//schema for goal form
export const goalSchema = z.object({
  title: z.string().max(50, "Note is over 50 character maximum"),
  goalType: z.enum(["budgeting", "long-term"]),

  goalAmount: z
    .number({
      message: "Amount must be a valid number",
    })
    .min(0, {
      message: "Amount cannot be negative",
    }),
  progressAmount: z
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
});
export type GoalFormData = z.infer<typeof goalSchema>;

//schema for account / profile form
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name is over 50 character maximum"),

  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),

  monthlyBudgetGoal: z
    .number({
      message: "Amount must be a valid number",
    })
    .min(0, {
      message: "Amount cannot be negative",
    }),

  notificationsEnabled: z.boolean(),
});
export type ProfileFormData = z.infer<typeof profileSchema>;
