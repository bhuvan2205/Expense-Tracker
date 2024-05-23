import Navbar from "@/components/Navbar";
import { type QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: Root,
});

function Root() {
	return (
		<>
			<Navbar />
			<hr />
			<div className="max-w-2xl m-auto">
				<Outlet />
			</div>
			<Toaster />
		</>
	);
}
