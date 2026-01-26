import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, ServiceTeamOrderType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getServiceTeamOrderHandler, getServiceTeamOrdersHandler } from "../dal/service_team_order";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";


export const ServiceTeamOrderQueryKey = (id: number, isEdit: boolean = false) => {
    if (isEdit) {
        return ["service_team_order", id, "edit"]
    }
    return ["service_team_order", id, "view"]
};

export const ServiceTeamOrdersQueryKey = (query: PaginationQueryType) => {
    const { page = 1, total = 10, search = "" } = query;
    return ["service_team_orders", page, total, search]
};

export const ServiceTeamOrderQueryFn = async ({ id, signal }: { id: number, signal?: AbortSignal }) => {
    return await getServiceTeamOrderHandler(id, signal);
}

export const ServiceTeamOrdersQueryFn = async ({ query, signal }: { query: PaginationQueryType, signal?: AbortSignal }) => {
    return await getServiceTeamOrdersHandler(query, signal);
}

/*
  Service Team Order Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useServiceTeamOrderQuery: (id: number, enabled: boolean, isEdit?: boolean) => UseQueryResult<
    ServiceTeamOrderType | undefined,
    unknown
> = (id, enabled, isEdit = false) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: ServiceTeamOrderQueryKey(id, isEdit),
        queryFn: () => ServiceTeamOrderQueryFn({ id }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Service Team Orders Query Hook Function: This hook is used to fetch information of all the users
*/
export const useServiceTeamOrdersQuery: () => UseQueryResult<
    PaginationType<ServiceTeamOrderType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useQuery({
        queryKey: ServiceTeamOrdersQueryKey(query),
        queryFn: () => ServiceTeamOrdersQueryFn({ query }),
        enabled: authToken !== null,
    });
};