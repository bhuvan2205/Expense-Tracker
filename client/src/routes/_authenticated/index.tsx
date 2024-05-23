import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { getExpenseTotal } from "@/data/expenses";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
	component: Index,
});

function Index() {
	const { isPending, data } = useQuery({
		queryKey: ["total-spent"],
		queryFn: getExpenseTotal,
	});

	return (
		<>
			<div className="max-w-md mx-auto my-4">
				<Card>
					<CardHeader>
						<CardTitle>Total Expenses</CardTitle>
						<CardDescription>
							Total amount you'have spent so far
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p>{isPending ? "..." : `$${data?.total ?? ""}`}</p>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
