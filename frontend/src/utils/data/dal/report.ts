import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, AdminRevenueSummaryReportType, AdminSalesPerformanceReportType, AdminApprovalTurnAroundReportType, AdminConversionFunnelReportType, AdminProfitLeaderboardReportType } from "../../types";
import type { GenericAbortSignal } from "axios";

export const getAdminSalesPerformanceReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<AdminSalesPerformanceReportType>>(
        api_routes.reports.salesPerformance.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getAdminRevenueSummaryReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<AdminRevenueSummaryReportType>>(
        api_routes.reports.revenueSummary.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getAdminApprovalTurnAroundReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<AdminApprovalTurnAroundReportType>>(
        api_routes.reports.approvalTurnAround.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getAdminConversionFunnelReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<AdminConversionFunnelReportType>>(
        api_routes.reports.conversionFunnel.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getAdminProfitLeaderboardReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<AdminProfitLeaderboardReportType>>(
        api_routes.reports.profitLeaderboard.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};