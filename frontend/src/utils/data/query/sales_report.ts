import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, SalesTeamPipelineStatusReportType, SalesTeamPerformanceReportType, SalesTeamProfitabilityPerQuotationReportType, SalesTeamTrendReportType, SalesTeamRevenueReportType, SalesTeamLeadSourcePerformanceReportType, SalesTeamApprovalTurnAroundReportType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getSalesTeamPipelineStatusReport, getSalesTeamPerformanceReport, getSalesTeamProfitabilityPerQuotationReport, getSalesTeamTrendReport, getSalesTeamRevenueReport, getSalesTeamLeadSourcePerformanceReport, getSalesTeamApprovalTurnAroundReport } from "../dal/sales_report";

export const SalesTeamPipelineStatusReportsQueryKey = (params: URLSearchParams) => {
    return ["sales_team_pipeline_status_reports", params.toString()]
};

export const SalesTeamPerformanceReportsQueryKey = (params: URLSearchParams) => {
    return ["sales_team_performance_reports", params.toString()]
};

export const SalesTeamProfitabilityPerQuotationReportsQueryKey = (params: URLSearchParams) => {
    return ["sales_team_profitability_per_quotation_reports", params.toString()]
};

export const SalesTeamTrendReportsQueryKey = (params: URLSearchParams) => {
    return ["sales_team_trend_reports", params.toString()]
};

export const SalesTeamRevenueReportsQueryKey = (params: URLSearchParams) => {
    return ["sales_team_revenue_reports", params.toString()]
};

export const SalesTeamLeadSourcePerformanceReportsQueryKey = (params: URLSearchParams) => {
    return ["sales_team_lead_source_performance_reports", params.toString()]
};

export const SalesTeamApprovalTurnAroundReportsQueryKey = (params: URLSearchParams) => {
    return ["sales_team_approval_turn_around_reports", params.toString()]
};

export const SalesTeamPipelineStatusReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesTeamPipelineStatusReport(params, signal);
}

export const SalesTeamPerformanceReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesTeamPerformanceReport(params, signal);
}

export const SalesTeamProfitabilityPerQuotationReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesTeamProfitabilityPerQuotationReport(params, signal);
}

export const SalesTeamTrendReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesTeamTrendReport(params, signal);
}

export const SalesTeamRevenueReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesTeamRevenueReport(params, signal);
}

export const SalesTeamLeadSourcePerformanceReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesTeamLeadSourcePerformanceReport(params, signal);
}

export const SalesTeamApprovalTurnAroundReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSalesTeamApprovalTurnAroundReport(params, signal);
}

/*
  Sales Team Pipeline Status Reports Query Hook Function: This hook is used to fetch information of all the sales team pipeline status reports
*/
export const useSalesTeamPipelineStatusReportsQuery: () => UseQueryResult<
    PaginationType<SalesTeamPipelineStatusReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesTeamPipelineStatusReportsQueryKey(params),
        queryFn: ({ signal }) => SalesTeamPipelineStatusReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Sales Team Performance Reports Query Hook Function: This hook is used to fetch information of all the sales team performance reports
*/
export const useSalesTeamPerformanceReportsQuery: () => UseQueryResult<
    PaginationType<SalesTeamPerformanceReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesTeamPerformanceReportsQueryKey(params),
        queryFn: ({ signal }) => SalesTeamPerformanceReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Sales Team Profitability Per Quotation Reports Query Hook Function: This hook is used to fetch information of all the sales team profitability per quotation reports
*/
export const useSalesTeamProfitabilityPerQuotationReportsQuery: () => UseQueryResult<
    PaginationType<SalesTeamProfitabilityPerQuotationReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesTeamProfitabilityPerQuotationReportsQueryKey(params),
        queryFn: ({ signal }) => SalesTeamProfitabilityPerQuotationReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Sales Team Trend Reports Query Hook Function: This hook is used to fetch information of all the sales team trend reports
*/
export const useSalesTeamTrendReportsQuery: () => UseQueryResult<
    PaginationType<SalesTeamTrendReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesTeamTrendReportsQueryKey(params),
        queryFn: ({ signal }) => SalesTeamTrendReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Sales Team Revenue Reports Query Hook Function: This hook is used to fetch information of all the sales team revenue reports
*/
export const useSalesTeamRevenueReportsQuery: () => UseQueryResult<
    PaginationType<SalesTeamRevenueReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesTeamRevenueReportsQueryKey(params),
        queryFn: ({ signal }) => SalesTeamRevenueReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Sales Team Lead Source Performance Reports Query Hook Function: This hook is used to fetch information of all the sales team lead source performance reports
*/
export const useSalesTeamLeadSourcePerformanceReportsQuery: () => UseQueryResult<
    PaginationType<SalesTeamLeadSourcePerformanceReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesTeamLeadSourcePerformanceReportsQueryKey(params),
        queryFn: ({ signal }) => SalesTeamLeadSourcePerformanceReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Sales Team Approval Turn Around Reports Query Hook Function: This hook is used to fetch information of all the sales team approval turn around reports
*/
export const useSalesTeamApprovalTurnAroundReportsQuery: () => UseQueryResult<
    PaginationType<SalesTeamApprovalTurnAroundReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SalesTeamApprovalTurnAroundReportsQueryKey(params),
        queryFn: ({ signal }) => SalesTeamApprovalTurnAroundReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};
