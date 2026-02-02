import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, ActivityLogType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getActivityLogHandler, getActivityLogsHandler } from "../dal/activity_log";
import { useSearchParams } from "react-router";


export const ActivityLogQueryKey = (id: number) => {
    return ["activity_log", id, "view"]
};

export const ActivityLogsQueryKey = (params: URLSearchParams) => {
    return ["activity_logs", params.toString()]
};

export const ActivityLogQueryFn = async ({ id, signal }: { id: number, signal?: AbortSignal }) => {
    return await getActivityLogHandler(id, signal);
}

export const ActivityLogsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getActivityLogsHandler(params, signal);
}

/*
  Activity Log Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useActivityLogQuery: (id: number, enabled: boolean) => UseQueryResult<
    ActivityLogType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: ActivityLogQueryKey(id),
        queryFn: ({ signal }) => ActivityLogQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Activity Logs Query Hook Function: This hook is used to fetch information of all the activity logs
*/
export const useActivityLogsQuery: () => UseQueryResult<
    PaginationType<ActivityLogType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: ActivityLogsQueryKey(params),
        queryFn: ({ signal }) => ActivityLogsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};