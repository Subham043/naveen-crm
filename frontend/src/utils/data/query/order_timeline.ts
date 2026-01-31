import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, OrderTimelineType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getOrderTimelineHandler } from "../dal/order_timeline";
import { PAGEKEY, TOTALKEY } from "@/hooks/usePaginationQueryParam";
import { SEARCHKEY } from "@/hooks/useSearchQueryParam";

export const OrderTimelineQueryKey = (id: number, params: URLSearchParams) => {
    return ["order_timeline", id, params.toString()]
};

export const OrderTimelineQueryFn = async ({ id, params, signal }: { id: number, params: URLSearchParams, signal?: AbortSignal }) => {
    return await getOrderTimelineHandler(id, params, signal);
}

/*
   Order Timeline Query Hook Function: This hook is used to fetch information of all the users
*/
export const useOrderTimelineQuery: (id: number, query?: PaginationQueryType) => UseQueryResult<
    PaginationType<OrderTimelineType> | undefined,
    unknown
> = (id, query = { page: 1, total: 10, search: "" }) => {
    const authToken = useAuthStore((state) => state.authToken)
    const params = new URLSearchParams();
    if (query.page) params.append(PAGEKEY, query.page.toString());
    if (query.total) params.append(TOTALKEY, query.total.toString());
    if (query.search) params.append(SEARCHKEY, query.search);

    return useQuery({
        queryKey: OrderTimelineQueryKey(id, params),
        queryFn: ({ signal }) => OrderTimelineQueryFn({ id, params, signal }),
        enabled: authToken !== null && id !== undefined && !isNaN(id),
    });
};