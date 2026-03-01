import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, SalesQuotationType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { SalesQuotationFormValuesType } from "@/utils/data/schema/sales_quotation";

export const createSalesQuotationHandler = async (val: SalesQuotationFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: SalesQuotationType }>(api_routes.sales.quotations.create, val, { signal });
    return response.data.data;
}

export const updateSalesQuotationHandler = async (id: number, val: SalesQuotationFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: SalesQuotationType }>(api_routes.sales.quotations.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const submitForApprovalSalesQuotationHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: SalesQuotationType }>(api_routes.sales.quotations.submitForApproval + `/${id}`, { signal });
    return response.data.data;
}

export const getSalesQuotationHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: SalesQuotationType }>(api_routes.sales.quotations.view + `/${id}`, { signal });
    return response.data.data;
}

export const getSalesQuotationsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<PaginationType<SalesQuotationType>>(api_routes.sales.quotations.paginate, { params, signal });
    return response.data;
}