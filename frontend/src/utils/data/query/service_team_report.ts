import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, ServiceTeamPerformanceReportType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getServiceTeamPerformanceReport } from "../dal/service_team_report";

export const ServiceTeamPerformanceReportsQueryKey = (params: URLSearchParams) => {
    return ["service_team_performance_reports", params.toString()]
};

export const ServiceTeamPerformanceReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getServiceTeamPerformanceReport(params, signal);
}


/*
  Service Team Performance Reports Query Hook Function: This hook is used to fetch information of all the service team performance reports
*/
export const useServiceTeamPerformanceReportsQuery: () => UseQueryResult<
    PaginationType<ServiceTeamPerformanceReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: ServiceTeamPerformanceReportsQueryKey(params),
        queryFn: ({ signal }) => ServiceTeamPerformanceReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};