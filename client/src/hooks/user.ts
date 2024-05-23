import { getCurrentUser } from "@/data/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
		staleTime: Infinity,
	});
};
