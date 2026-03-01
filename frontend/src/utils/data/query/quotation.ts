import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, QuotationType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getQuotationHandler, getQuotationsHandler } from "../dal/quotation";
import { useSearchParams } from "react-router";


export const QuotationQueryKey = (id: number, isEdit: boolean = false) => {
    if (isEdit) {
        return ["quotation", id, "edit"]
    }
    return ["quotation", id, "view"]
};

export const QuotationsQueryKey = (params: URLSearchParams) => {
    return ["quotations", params.toString()]
};

export const QuotationQueryFn = async ({ id, signal }: { id: number, signal?: AbortSignal }) => {
    return await getQuotationHandler(id, signal);
}

export const QuotationsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getQuotationsHandler(params, signal);
}

/*
   Quotation Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useQuotationQuery: (id: number, enabled: boolean, isEdit?: boolean) => UseQueryResult<
    QuotationType | undefined,
    unknown
> = (id, enabled, isEdit = false) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: QuotationQueryKey(id, isEdit),
        queryFn: ({ signal }) => QuotationQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
   Quotations Query Hook Function: This hook is used to fetch information of all the users
*/
export const useQuotationsQuery: () => UseQueryResult<
    PaginationType<QuotationType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: QuotationsQueryKey(params),
        queryFn: ({ signal }) => QuotationsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};