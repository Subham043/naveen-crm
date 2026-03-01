import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, OrderType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { OrderUpdateFormValuesType } from "../schema/order";

export const updateOrderHandler = async (id: number, val: OrderUpdateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: OrderType }>(api_routes.orders.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const getOrderHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: OrderType }>(api_routes.orders.view + `/${id}`, { signal });
    return response.data.data;
}

export const getOrdersHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<PaginationType<OrderType>>(api_routes.orders.paginate, { params, signal });
    return response.data;
}