import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, SalesOrderType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSalesOrderHandler, getSalesOrdersHandler } from "../dal/sales_order";
import { useSearchParams } from "react-router";


export const SalesOrderQueryKey = (id: number, isEdit: boolean = false) => {
    if (isEdit) {
        return ["sales_order", id, "edit"]
    }
    return ["sales_order", id, "view"]
};

export const SalesOrdersQueryKey = (params: URLSearchParams) => {
    return ["sales_orders", params.toString()]
};

export const SalesOrderQueryFn = async ({ id, signal }: { id: number, signal?: AbortSignal }) => {
    return await getSalesOrderHandler(id, signal);
}

export const SalesOrdersQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesOrdersHandler(params, signal);
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
        queryFn: ({ signal }) => SalesOrderQueryFn({ id, signal }),
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
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesOrdersQueryKey(params),
        queryFn: ({ signal }) => SalesOrdersQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};