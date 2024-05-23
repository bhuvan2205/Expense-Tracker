import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
	component: Profile,
});

function Profile() {
	const { isPending, data } = useUser();

	if (isPending)
		return (
			<div className="flex flex-col items-start gap-2 my-2 space-x-4">
				<Skeleton className="h-12 w-12 ms-4 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		);

	return (
		<div className="py-2">
			<div className="flex gap-4">
				<Avatar>
					<AvatarImage src={data?.user?.picture} alt={data?.user?.name} />
					<AvatarFallback>{data?.user?.name?.at(0)}</AvatarFallback>
				</Avatar>
				<p className="my-2">{data?.user?.name}</p>
			</div>
			<Button asChild className="my-4">
				<a href="/api/logout">logout</a>
			</Button>
		</div>
	);
}
