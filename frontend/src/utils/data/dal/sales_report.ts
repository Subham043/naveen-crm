import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, SalesTeamPipelineStatusReportType, SalesTeamPerformanceReportType, SalesTeamProfitabilityPerQuotationReportType, SalesTeamTrendReportType, SalesTeamRevenueReportType, SalesTeamLeadSourcePerformanceReportType, SalesTeamApprovalTurnAroundReportType } from "../../types";
import type { GenericAbortSignal } from "axios";

export const getSalesTeamPipelineStatusReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<SalesTeamPipelineStatusReportType>>(
        api_routes.sales.reports.salesPipelineStatusReport.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getSalesTeamPerformanceReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<SalesTeamPerformanceReportType>>(
        api_routes.sales.reports.salesPerformance.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getSalesTeamProfitabilityPerQuotationReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<SalesTeamProfitabilityPerQuotationReportType>>(
        api_routes.sales.reports.profitabilityPerQuotationReport.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getSalesTeamTrendReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<SalesTeamTrendReportType>>(
        api_routes.sales.reports.salesTrendReport.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getSalesTeamRevenueReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<SalesTeamRevenueReportType>>(
        api_routes.sales.reports.salesRevenueReport.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getSalesTeamLeadSourcePerformanceReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<SalesTeamLeadSourcePerformanceReportType>>(
        api_routes.sales.reports.salesLeadSourcePerformance.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getSalesTeamApprovalTurnAroundReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<SalesTeamApprovalTurnAroundReportType>>(
        api_routes.sales.reports.salesApprovalTurnAroundReport.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};