import { insertExpenseSchema } from "../schema/expense";

export const expensePayloadSchema = insertExpenseSchema.omit({
	userId: true,
	createdAt: true,
});
