import Login from "@/components/Login";
import { userQueryOptions } from "@/data/user";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ context }) => {
		const { queryClient } = context || {};

		try {
			const data = await queryClient.fetchQuery(userQueryOptions);
			const { user } = data || {};
			return { user };
		} catch (error) {
			return { user: null };
		}
	},
	component: Component,
});

function Component() {
	const { user } = Route.useRouteContext();
	if (!user) {
		return <Login />;
	}

	return <Outlet />;
}
