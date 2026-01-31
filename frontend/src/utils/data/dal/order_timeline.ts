import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, OrderTimelineType } from "../../types";
import type { GenericAbortSignal } from "axios";

export const getOrderTimelineHandler = async (id: number, params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<PaginationType<OrderTimelineType>>(api_routes.orders.timeline + `/${id}`, { params, signal });
    return response.data;
}