import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, ServiceTeamPerformanceReportType } from "../../types";
import type { GenericAbortSignal } from "axios";


export const getServiceTeamPerformanceReport = async (
    params: URLSearchParams,
    signal?: GenericAbortSignal
) => {
    const response = await axios.get<PaginationType<ServiceTeamPerformanceReportType>>(
        api_routes.serviceTeam.reports.servicePerformance.paginate,
        {
            params,
            signal,
        }
    );
    return response.data;
};