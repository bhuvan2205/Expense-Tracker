import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { expensePayloadSchema } from "@server/formSchema";
import { Calendar } from "@/components/ui/calendar";
import { useQueryClient } from "@tanstack/react-query";
import {
	createExpense,
	getAllExpenseQueryOptions,
	loadingCreateExpenseQueryOptions,
} from "@/data/expenses";
import { useToast } from "@/components/ui/use-toast";

export const Route = createFileRoute("/_authenticated/create-expense")({
	component: CreateExpense,
});

function CreateExpense() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const form = useForm({
		validatorAdapter: zodValidator,
		defaultValues: {
			title: "",
			amount: "",
			date: new Date()?.toISOString(),
		},
		onSubmit: async ({ value }) => {
			const existingExpenses = await queryClient.ensureQueryData(
				getAllExpenseQueryOptions
			);

			navigate({ to: "/expenses" });

			queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
				expense: value,
			});
			try {
				const expense = await createExpense(value);

				queryClient.setQueryData(getAllExpenseQueryOptions.queryKey, {
					...existingExpenses,
					expenses: [expense, ...existingExpenses.expenses],
				});
				toast({
					title: "Expense Created",
					description: `Expense with title "${expense.title}" created successfully!`,
				});
			} catch (error) {
				let message = "Something went wrong!";
				if (error instanceof Error) {
					message = error.message;
				} else if (typeof error === "string") {
					message = error;
				}
				toast({
					variant: "destructive",
					title: "Error",
					description: message,
				});
			} finally {
				queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
			}
		},
	});
	return (
		<div className="p-2">
			<h2>Create Expense!</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="max-w-xl m-auto flex flex-col">
				<form.Field
					name="title"
					validators={{ onChange: expensePayloadSchema.shape.title }}
					children={(field) => (
						<div className="space-y-2 my-2">
							<Label htmlFor={field.name}>Title</Label>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<>
								{field.state.meta.touchedErrors ? (
									<em>{field.state.meta.touchedErrors}</em>
								) : null}
							</>
						</div>
					)}
				/>

				<form.Field
					name="amount"
					validators={{ onChange: expensePayloadSchema.shape.amount }}
					children={(field) => (
						<div className="space-y-2 my-2">
							<Label htmlFor={field.name}>Amount</Label>
							<Input
								type="number"
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<>
								{field.state.meta.touchedErrors ? (
									<em>{field.state.meta.touchedErrors}</em>
								) : null}
							</>
						</div>
					)}
				/>

				<form.Field
					name="date"
					validators={{ onChange: expensePayloadSchema.shape.date }}
					children={(field) => (
						<div className="self-center">
							<Calendar
								mode="single"
								selected={new Date(field.state.value)}
								onSelect={(date) =>
									field.handleChange((date ?? new Date()).toISOString())
								}
								className="rounded-md border"
							/>
							<>
								{field.state.meta.touchedErrors ? (
									<em>{field.state.meta.touchedErrors}</em>
								) : null}
							</>
						</div>
					)}
				/>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<Button type="submit" disabled={!canSubmit} className="my-2">
							{isSubmitting ? "..." : "Create"}
						</Button>
					)}
				/>
			</form>
		</div>
	);
}
