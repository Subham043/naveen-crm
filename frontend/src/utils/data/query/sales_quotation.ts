import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, SalesQuotationType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSalesQuotationHandler, getSalesQuotationsHandler } from "../dal/sales_quotation";
import { useSearchParams } from "react-router";


export const SalesQuotationQueryKey = (id: number, isEdit: boolean = false) => {
    if (isEdit) {
        return ["sales_quotation", id, "edit"]
    }
    return ["sales_quotation", id, "view"]
};

export const SalesQuotationsQueryKey = (params: URLSearchParams) => {
    return ["sales_quotations", params.toString()]
};

export const SalesQuotationQueryFn = async ({ id, signal }: { id: number, signal?: AbortSignal }) => {
    return await getSalesQuotationHandler(id, signal);
}

export const SalesQuotationsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesQuotationsHandler(params, signal);
}

/*
  Sales Quotation Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useSalesQuotationQuery: (id: number, enabled: boolean, isEdit?: boolean) => UseQueryResult<
    SalesQuotationType | undefined,
    unknown
> = (id, enabled, isEdit = false) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: SalesQuotationQueryKey(id, isEdit),
        queryFn: ({ signal }) => SalesQuotationQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Sales Quotations Query Hook Function: This hook is used to fetch information of all the users
*/
export const useSalesQuotationsQuery: () => UseQueryResult<
    PaginationType<SalesQuotationType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesQuotationsQueryKey(params),
        queryFn: ({ signal }) => SalesQuotationsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};