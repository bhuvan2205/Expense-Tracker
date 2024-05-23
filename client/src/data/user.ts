import { api } from "@/lib/api";
import { UseQueryOptions } from "@tanstack/react-query";

export const getCurrentUser = async () => {
	const res = await api.me.$get();
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	return await res.json();
};

export const userQueryOptions = {
	queryKey: ["user"],
	queryFn: getCurrentUser,
	staleTime: Infinity,
} as UseQueryOptions<
	{ user: { id: string; name: string; email: string } },
	Error
>;
