import { createFileRoute } from "@tanstack/react-router";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteExpense, useExpenses } from "@/hooks/expenses";
import { useQuery } from "@tanstack/react-query";
import { loadingCreateExpenseQueryOptions } from "@/data/expenses";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export const Route = createFileRoute("/_authenticated/expenses")({
	component: Expenses,
});

function Expenses() {
	const { data, isLoading } = useExpenses();
	const { data: loadingExpenseData } = useQuery(
		loadingCreateExpenseQueryOptions
	);
	return (
		<div className="p-2 max-w-3xl m-auto">
			<Table>
				<TableCaption>A list of all your expenses</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Spent on</TableHead>
						<TableHead>Delete</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loadingExpenseData?.expense && (
						<TableRow>
							<TableCell className="font-medium">
								<Skeleton className="h-4" />
							</TableCell>
							<TableCell>{loadingExpenseData?.expense?.title}</TableCell>
							<TableCell>{loadingExpenseData?.expense?.amount}</TableCell>
							<TableCell>
								{loadingExpenseData?.expense?.date?.slice(0, 10)}
							</TableCell>
							<TableCell>
								<Button variant="outline" size="icon" disabled>
									<Trash className="w-4 h-4" />
								</Button>
							</TableCell>
						</TableRow>
					)}
					{isLoading
						? Array(3)
								.fill(0)
								.map((_, i) => (
									<TableRow key={i}>
										<TableCell className="font-medium">
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
									</TableRow>
								))
						: data?.expenses.map(
								(expense: {
									id: string;
									title: string;
									amount: number;
									date: string;
								}) => (
									<TableRow key={expense.id}>
										<TableCell className="font-medium">{expense.id}</TableCell>
										<TableCell>{expense.title}</TableCell>
										<TableCell>{expense.amount}</TableCell>
										<TableCell>{expense.date.slice(0, 10)}</TableCell>
										<TableCell>
											<DeleteExpenseButton id={expense.id} />
										</TableCell>
									</TableRow>
								)
							)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell colSpan={9} className="text-right">
							$2,500.00
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}

function DeleteExpenseButton({ id }: { id: string }) {
	const { mutate, isPending } = useDeleteExpense(id);
	return (
		<>
			<Button
				onClick={() => mutate()}
				variant="outline"
				size="icon"
				disabled={isPending}>
				{isPending ? "..." : <Trash className="w-4 h-4" />}
			</Button>
		</>
	);
}
