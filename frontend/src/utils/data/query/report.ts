import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, SalesReportType, AgentPerformanceReportType, RevenueSummaryReportType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getSalesReport, getAgentPerformanceReport, getRevenueSummaryReport } from "../dal/report";



export const SalesReportsQueryKey = (params: URLSearchParams) => {
    return ["sales_reports", params.toString()]
};

export const AgentPerformanceReportsQueryKey = (params: URLSearchParams) => {
    return ["agent_performance_reports", params.toString()]
};

export const RevenueSummaryReportsQueryKey = (params: URLSearchParams) => {
    return ["revenue_summary_reports", params.toString()]
};

export const SalesReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesReport(params, signal);
}

export const AgentPerformanceReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAgentPerformanceReport(params, signal);
}

export const RevenueSummaryReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getRevenueSummaryReport(params, signal);
}

/*
  Sales Reports Query Hook Function: This hook is used to fetch information of all the sales reports
*/
export const useSalesReportsQuery: () => UseQueryResult<
    PaginationType<SalesReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesReportsQueryKey(params),
        queryFn: ({ signal }) => SalesReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Agent Performance Reports Query Hook Function: This hook is used to fetch information of all the agent performance reports
*/
export const useAgentPerformanceReportsQuery: () => UseQueryResult<
    PaginationType<AgentPerformanceReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: AgentPerformanceReportsQueryKey(params),
        queryFn: ({ signal }) => AgentPerformanceReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Revenue Summary Reports Query Hook Function: This hook is used to fetch information of all the revenue summary reports
*/
export const useRevenueSummaryReportsQuery: () => UseQueryResult<
    PaginationType<RevenueSummaryReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: RevenueSummaryReportsQueryKey(params),
        queryFn: ({ signal }) => RevenueSummaryReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};