import { api } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export const getExpenseTotal = async () => {
	const res = await api.expenses["total-spent"].$get();
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	return await res.json();
};

export const getAllExpenses = async () => {
	const res = await api.expenses.$get();
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	return await res.json();
};

export const getAllExpenseQueryOptions = {
	queryKey: ["expenses"],
	queryFn: getAllExpenses,
	staleTime: 1000 * 5,
};

export const createExpense = async (payload: {
	date: string;
	title: string;
	amount: string;
}) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const res = await api.expenses.$post({
		json: payload,
	});
	if (!res.ok) {
		throw new Error("Something went wrong");
	}
	const expense = await res.json();
	return expense;
};

export const loadingCreateExpenseQueryOptions = queryOptions<
	{
		expense?: {
			date: string;
			title: string;
			amount: string;
		};
	},
	Error
>({
	queryKey: ["loading-create-expense"],
	queryFn: async () => ({}),
	staleTime: Infinity,
});

export const deleteExpense = async (id: string) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	const res = await api.expenses[":id{[0-9]+}"].$delete({
		param: { id },
	});

	if (!res.ok) {
		throw new Error("server error");
	}
};
