import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, ServiceTeamOrderType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getServiceTeamOrderHandler, getServiceTeamOrdersHandler } from "../dal/service_team_order";
import { useSearchParams } from "react-router";


export const ServiceTeamOrderQueryKey = (id: number, isEdit: boolean = false) => {
    if (isEdit) {
        return ["service_team_order", id, "edit"]
    }
    return ["service_team_order", id, "view"]
};

export const ServiceTeamOrdersQueryKey = (params: URLSearchParams) => {
    return ["service_team_orders", params.toString()]
};

export const ServiceTeamOrderQueryFn = async ({ id, signal }: { id: number, signal?: AbortSignal }) => {
    return await getServiceTeamOrderHandler(id, signal);
}

export const ServiceTeamOrdersQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getServiceTeamOrdersHandler(params, signal);
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
        queryFn: ({ signal }) => ServiceTeamOrderQueryFn({ id, signal }),
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
    const [params] = useSearchParams();

    return useQuery({
        queryKey: ServiceTeamOrdersQueryKey(params),
        queryFn: ({ signal }) => ServiceTeamOrdersQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};