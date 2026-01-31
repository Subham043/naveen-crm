import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, SalesOrderType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { SalesOrderFormValuesType } from "@/utils/data/schema/sales_order";

export const createSalesOrderHandler = async (val: SalesOrderFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: SalesOrderType }>(api_routes.sales.orders.create, val, { signal });
    return response.data.data;
}

export const updateSalesOrderHandler = async (id: number, val: SalesOrderFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: SalesOrderType }>(api_routes.sales.orders.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const submitForApprovalSalesOrderHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: SalesOrderType }>(api_routes.sales.orders.submitForApproval + `/${id}`, { signal });
    return response.data.data;
}

export const getSalesOrderHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: SalesOrderType }>(api_routes.sales.orders.view + `/${id}`, { signal });
    return response.data.data;
}

export const getSalesOrdersHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<PaginationType<SalesOrderType>>(api_routes.sales.orders.paginate, { params, signal });
    return response.data;
}