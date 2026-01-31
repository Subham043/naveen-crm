import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, OrderType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { OrderApprovalFormValuesType, OrderPublicCreateFormValuesType } from "../schema/order";

export const createPublicOrderHandler = async (val: OrderPublicCreateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    await axios.post(api_routes.orders.publicCreate, val, { signal });
}

export const approvalOrderHandler = async (id: number, data: OrderApprovalFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: OrderType }>(api_routes.orders.approval + `/${id}`, data, { signal });
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