import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, SalesOrderType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSalesOrderHandler, getSalesOrdersHandler } from "../dal/sales_order";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";


export const SalesOrderQueryKey = (id: number, isEdit: boolean = false) => {
    if (isEdit) {
        return ["sales_order", id, "edit"]
    }
    return ["sales_order", id, "view"]
};

export const SalesOrdersQueryKey = (query: PaginationQueryType) => {
    const { page = 1, total = 10, search = "" } = query;
    return ["sales_orders", page, total, search]
};

export const SalesOrderQueryFn = async ({ id, signal }: { id: number, signal?: AbortSignal }) => {
    return await getSalesOrderHandler(id, signal);
}

export const SalesOrdersQueryFn = async ({ query, signal }: { query: PaginationQueryType, signal?: AbortSignal }) => {
    return await getSalesOrdersHandler(query, signal);
}

/*
  Sales Order Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useSalesOrderQuery: (id: number, enabled: boolean, isEdit?: boolean) => UseQueryResult<
    SalesOrderType | undefined,
    unknown
> = (id, enabled, isEdit = false) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: SalesOrderQueryKey(id, isEdit),
        queryFn: () => SalesOrderQueryFn({ id }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Sales Orders Query Hook Function: This hook is used to fetch information of all the users
*/
export const useSalesOrdersQuery: () => UseQueryResult<
    PaginationType<SalesOrderType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useQuery({
        queryKey: SalesOrdersQueryKey(query),
        queryFn: () => SalesOrdersQueryFn({ query }),
        enabled: authToken !== null,
    });
};