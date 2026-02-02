import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, SalesReportType, AgentPerformanceReportType, RevenueSummaryReportType } from "../../types";
import type { GenericAbortSignal } from "axios";

export const getSalesReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<SalesReportType>>(
        api_routes.reports.sales.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getAgentPerformanceReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<AgentPerformanceReportType>>(
        api_routes.reports.agentPerformance.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};

export const getRevenueSummaryReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<RevenueSummaryReportType>>(
        api_routes.reports.revenueSummary.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};