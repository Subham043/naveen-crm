import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, OrderTimelineType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getOrderTimelineHandler } from "../dal/order_timeline";

export const OrderTimelineQueryKey = (id: number, query: PaginationQueryType) => {
    const { page = 1, total = 10, search = "" } = query;
    return ["order_timeline", id, page, total, search]
};

export const OrderTimelineQueryFn = async ({ id, query, signal }: { id: number, query: PaginationQueryType, signal?: AbortSignal }) => {
    return await getOrderTimelineHandler(id, query, signal);
}

/*
   Order Timeline Query Hook Function: This hook is used to fetch information of all the users
*/
export const useOrderTimelineQuery: (id: number, query?: PaginationQueryType) => UseQueryResult<
    PaginationType<OrderTimelineType> | undefined,
    unknown
> = (id, query = { page: 1, total: 10, search: "" }) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: OrderTimelineQueryKey(id, query),
        queryFn: () => OrderTimelineQueryFn({ id, query }),
        enabled: authToken !== null && id !== undefined && !isNaN(id),
    });
};