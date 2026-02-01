import type { GenericAbortSignal } from "axios";
import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";


export const getDashboardHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: Record<string, string | number | null> }>(api_routes.dashboard, { signal });
    return response.data.data;
}