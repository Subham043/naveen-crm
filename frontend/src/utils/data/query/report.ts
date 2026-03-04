import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, AdminSalesPerformanceReportType, AdminRevenueSummaryReportType, AdminApprovalTurnAroundReportType, AdminConversionFunnelReportType, AdminProfitLeaderboardReportType, AdminServicePerformanceReportType, AdminOrderPaymentReportType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getAdminSalesPerformanceReport, getAdminRevenueSummaryReport, getAdminApprovalTurnAroundReport, getAdminConversionFunnelReport, getAdminProfitLeaderboardReport, getAdminServicePerformanceReport, getAdminOrderPaymentReport } from "../dal/report";

export const AdminSalesPerformanceReportsQueryKey = (params: URLSearchParams) => {
    return ["admin_sales_performance_reports", params.toString()]
};

export const AdminRevenueSummaryReportsQueryKey = (params: URLSearchParams) => {
    return ["admin_revenue_summary_reports", params.toString()]
};

export const AdminApprovalTurnAroundReportsQueryKey = (params: URLSearchParams) => {
    return ["admin_approval_turn_around_reports", params.toString()]
};

export const AdminConversionFunnelReportsQueryKey = (params: URLSearchParams) => {
    return ["admin_conversion_funnel_reports", params.toString()]
};

export const AdminProfitLeaderboardReportsQueryKey = (params: URLSearchParams) => {
    return ["admin_profit_leaderboard_reports", params.toString()]
};

export const AdminServicePerformanceReportsQueryKey = (params: URLSearchParams) => {
    return ["admin_service_performance_reports", params.toString()]
};

export const AdminOrderPaymentReportsQueryKey = (params: URLSearchParams) => {
    return ["admin_order_payment_reports", params.toString()]
};

export const AdminSalesPerformanceReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAdminSalesPerformanceReport(params, signal);
}

export const AdminRevenueSummaryReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAdminRevenueSummaryReport(params, signal);
}

export const AdminApprovalTurnAroundReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAdminApprovalTurnAroundReport(params, signal);
}

export const AdminConversionFunnelReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAdminConversionFunnelReport(params, signal);
}

export const AdminProfitLeaderboardReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAdminProfitLeaderboardReport(params, signal);
}

export const AdminServicePerformanceReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAdminServicePerformanceReport(params, signal);
}

export const AdminOrderPaymentReportsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAdminOrderPaymentReport(params, signal);
}

/*
  Admin Sales Performance Reports Query Hook Function: This hook is used to fetch information of all the admin sales performance reports
*/
export const useAdminSalesPerformanceReportsQuery: () => UseQueryResult<
    PaginationType<AdminSalesPerformanceReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: AdminSalesPerformanceReportsQueryKey(params),
        queryFn: ({ signal }) => AdminSalesPerformanceReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Admin Revenue Summary Reports Query Hook Function: This hook is used to fetch information of all the admin revenue summary reports
*/
export const useAdminRevenueSummaryReportsQuery: () => UseQueryResult<
    PaginationType<AdminRevenueSummaryReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: AdminRevenueSummaryReportsQueryKey(params),
        queryFn: ({ signal }) => AdminRevenueSummaryReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Admin Approval Turn Around Reports Query Hook Function: This hook is used to fetch information of all the admin approval turn around reports
*/
export const useAdminApprovalTurnAroundReportsQuery: () => UseQueryResult<
    PaginationType<AdminApprovalTurnAroundReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: AdminApprovalTurnAroundReportsQueryKey(params),
        queryFn: ({ signal }) => AdminApprovalTurnAroundReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Admin Conversion Funnel Reports Query Hook Function: This hook is used to fetch information of all the admin conversion funnel reports
*/
export const useAdminConversionFunnelReportsQuery: () => UseQueryResult<
    PaginationType<AdminConversionFunnelReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: AdminConversionFunnelReportsQueryKey(params),
        queryFn: ({ signal }) => AdminConversionFunnelReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Admin Profit Leaderboard Reports Query Hook Function: This hook is used to fetch information of all the admin profit leaderboard reports
*/
export const useAdminProfitLeaderboardReportsQuery: () => UseQueryResult<
    PaginationType<AdminProfitLeaderboardReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: AdminProfitLeaderboardReportsQueryKey(params),
        queryFn: ({ signal }) => AdminProfitLeaderboardReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};


/*
  Admin Service Performance Reports Query Hook Function: This hook is used to fetch information of all the admin service performance reports
*/
export const useAdminServicePerformanceReportsQuery: () => UseQueryResult<
    PaginationType<AdminServicePerformanceReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: AdminServicePerformanceReportsQueryKey(params),
        queryFn: ({ signal }) => AdminServicePerformanceReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Admin Order Payment Reports Query Hook Function: This hook is used to fetch information of all the admin order payment reports
*/
export const useAdminOrderPaymentReportsQuery: () => UseQueryResult<
    PaginationType<AdminOrderPaymentReportType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: AdminOrderPaymentReportsQueryKey(params),
        queryFn: ({ signal }) => AdminOrderPaymentReportsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};
