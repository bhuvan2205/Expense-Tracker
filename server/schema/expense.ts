import {
	pgTable,
	serial,
	text,
	index,
	numeric,
	timestamp,
	date,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const expenses = pgTable(
	"expenses",
	{
		id: serial("id").primaryKey(),
		userId: text("user_id").notNull(),
		title: text("title").notNull(),
		amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
		date: date("date", { mode: "string" }).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(expenses) => {
		return {
			userIdIndex: index("name_idx").on(expenses.userId),
		};
	}
);

export const insertExpenseSchema = createInsertSchema(expenses, {
	title: z
		.string()
		.min(1, { message: "Min 2 charcters" })
		.max(255, { message: "Max 255 charcters" }),
	amount: z
		.string()
		.min(1, { message: "Min $1.00" })
		.max(12, { message: "Max $12,000,000.00" }),
});

export const selectExpenseSchema = createSelectSchema(expenses);
