import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, OrderType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getOrderHandler, getOrdersHandler } from "../dal/order";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";


export const OrderQueryKey = (id: number, isEdit: boolean = false) => {
    if (isEdit) {
        return ["order", id, "edit"]
    }
    return ["order", id, "view"]
};

export const OrdersQueryKey = (query: PaginationQueryType) => {
    const { page = 1, total = 10, search = "" } = query;
    return ["orders", page, total, search]
};

export const OrderQueryFn = async ({ id, signal }: { id: number, signal?: AbortSignal }) => {
    return await getOrderHandler(id, signal);
}

export const OrdersQueryFn = async ({ query, signal }: { query: PaginationQueryType, signal?: AbortSignal }) => {
    return await getOrdersHandler(query, signal);
}

/*
   Order Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useOrderQuery: (id: number, enabled: boolean, isEdit?: boolean) => UseQueryResult<
    OrderType | undefined,
    unknown
> = (id, enabled, isEdit = false) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: OrderQueryKey(id, isEdit),
        queryFn: () => OrderQueryFn({ id }),
        enabled: authToken !== null && enabled,
    });
};

/*
   Orders Query Hook Function: This hook is used to fetch information of all the users
*/
export const useOrdersQuery: () => UseQueryResult<
    PaginationType<OrderType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useQuery({
        queryKey: OrdersQueryKey(query),
        queryFn: () => OrdersQueryFn({ query }),
        enabled: authToken !== null,
    });
};