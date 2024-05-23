import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "server/auth";
import { db } from "server/db";
import {
	expenses as expensesTable,
	insertExpenseSchema,
} from "server/schema/expense";
import { desc, eq, sum, and } from "drizzle-orm";
import { expensePayloadSchema } from "server/formSchema";

export const expenseRoute = new Hono();

expenseRoute
	.get("/", getUser, async (c) => {
		const { user } = c.var || {};
		const expenses = await db
			.select()
			.from(expensesTable)
			.where(eq(expensesTable.userId, user.id))
			.orderBy(desc(expensesTable.createdAt))
			.limit(25);

		return c.json({
			expenses,
		});
	})
	.post("/", getUser, zValidator("json", expensePayloadSchema), async (c) => {
		const expense = c.req.valid("json");

		const { user } = c.var || {};
		const validExpense = insertExpenseSchema.parse({
			...expense,
			userId: user.id,
		});

		const result = await db
			.insert(expensesTable)
			.values(validExpense)
			.returning()
			.then((rows) => rows[0]);

		c.status(201);
		return c.json(result);
	})
	.get("/total-spent", getUser, async (c) => {
		const { user } = c.var || {};

		const total = await db
			.select({ total: sum(expensesTable.amount) })
			.from(expensesTable)
			.where(eq(expensesTable.userId, user.id))
			.then((rows) => rows[0].total);
		return c.json({
			total,
		});
	})
	.get("/:id{[0-9]+}", getUser, async (c) => {
		const id = Number.parseInt(c.req.param("id"));
		const { user } = c.var || {};

		const expense = await db
			.select()
			.from(expensesTable)
			.where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
			.then((rows) => rows[0]);

		if (!expense) {
			return c.notFound();
		}

		return c.json({
			expense,
		});
	})
	.delete("/:id{[0-9]+}", getUser, async (c) => {
		const id = Number.parseInt(c.req.param("id"));
		const { user } = c.var || {};

		const expense = await db
			.delete(expensesTable)
			.where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
			.returning()
			.then((rows) => rows[0]);

		if (!expense) {
			return c.notFound();
		}

		return c.json({
			expense,
		});
	});
