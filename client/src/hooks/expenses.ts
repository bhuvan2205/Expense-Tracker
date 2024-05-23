import { useToast } from "@/components/ui/use-toast";
import { deleteExpense, getAllExpenseQueryOptions } from "@/data/expenses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useExpenses = () => {
	return useQuery(getAllExpenseQueryOptions);
};

export const useDeleteExpense = (id: string) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: () => deleteExpense(id),
		onError: () => {
			queryClient.setQueryData(
				getAllExpenseQueryOptions.queryKey,
				(prev: { expenses: { id: string }[] }) => ({
					...prev,
					expenses: prev!.expenses.filter((expense) => expense.id !== id),
				})
			);

			toast({
				variant: "destructive",
				title: "Error",
				description: `Failed to delete the item ${id}`,
			});
		},
		onSuccess: () => {
			toast({
				title: "Expense Deleted",
				description: `Successfully deleted the item ${id}`,
			});
		},
	});
};
