import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationQueryType, PaginationType, OrderTimelineType } from "../../types";
import type { GenericAbortSignal } from "axios";

export const getOrderTimelineHandler = async (id: number, query: PaginationQueryType, signal?: GenericAbortSignal | undefined) => {
    const { page = 1, total = 10, search = "" } = query;
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (total) params.append("total", total.toString());
    if (search) params.append("filter[search]", search);
    const response = await axios.get<PaginationType<OrderTimelineType>>(api_routes.orders.timeline + `/${id}`, { params, signal });
    return response.data;
}