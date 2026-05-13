import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, QuotationType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { QuotationApprovalFormValuesType, QuotationPublicCreateFormValuesType, QuotationFormValuesType } from "../schema/quotation";

export const createPublicQuotationHandler = async (val: QuotationPublicCreateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    await axios.post(api_routes.quotations.publicCreate, val, { signal });
}

export const approvalQuotationHandler = async (id: number, data: QuotationApprovalFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: QuotationType }>(api_routes.quotations.approval + `/${id}`, data, { signal });
    return response.data.data;
}

export const createQuotationHandler = async (val: QuotationFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: QuotationType }>(api_routes.quotations.create, val, { signal });
    return response.data.data;
}

export const updateQuotationHandler = async (id: number, val: QuotationFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: QuotationType }>(api_routes.quotations.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const getQuotationHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: QuotationType }>(api_routes.quotations.view + `/${id}`, { signal });
    return response.data.data;
}

export const getQuotationsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<PaginationType<QuotationType>>(api_routes.quotations.paginate, { params, signal });
    return response.data;
}