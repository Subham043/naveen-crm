import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, QuotationTimelineType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getQuotationTimelineHandler } from "../dal/quotation_timeline";
import { PAGEKEY, TOTALKEY } from "@/hooks/usePaginationQueryParam";
import { SEARCHKEY } from "@/hooks/useSearchQueryParam";

export const QuotationTimelineQueryKey = (id: number, params: URLSearchParams) => {
    return ["quotation_timeline", id, params.toString()]
};

export const QuotationTimelineQueryFn = async ({ id, params, signal }: { id: number, params: URLSearchParams, signal?: AbortSignal }) => {
    return await getQuotationTimelineHandler(id, params, signal);
}

/*
   Quotation Timeline Query Hook Function: This hook is used to fetch information of all the users
*/
export const useQuotationTimelineQuery: (id: number, query?: PaginationQueryType) => UseQueryResult<
    PaginationType<QuotationTimelineType> | undefined,
    unknown
> = (id, query = { page: 1, total: 10, search: "" }) => {
    const authToken = useAuthStore((state) => state.authToken)
    const params = new URLSearchParams();
    if (query.page) params.append(PAGEKEY, query.page.toString());
    if (query.total) params.append(TOTALKEY, query.total.toString());
    if (query.search) params.append(SEARCHKEY, query.search);

    return useQuery({
        queryKey: QuotationTimelineQueryKey(id, params),
        queryFn: ({ signal }) => QuotationTimelineQueryFn({ id, params, signal }),
        enabled: authToken !== null && id !== undefined && !isNaN(id),
    });
};