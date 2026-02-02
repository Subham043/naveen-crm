import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { ActivityLogType, PaginationType } from "@/utils/types";
import type { GenericAbortSignal } from "axios";

export const getActivityLogHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ActivityLogType }>(api_routes.activityLog.view + `/${id}`, { signal });
    return response.data.data;
}

export const getActivityLogsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<PaginationType<ActivityLogType>>(api_routes.activityLog.paginate, { params, signal });
    return response.data;
}