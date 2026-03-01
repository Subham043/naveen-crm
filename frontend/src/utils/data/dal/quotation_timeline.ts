import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, QuotationTimelineType } from "../../types";
import type { GenericAbortSignal } from "axios";

export const getQuotationTimelineHandler = async (id: number, params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<PaginationType<QuotationTimelineType>>(api_routes.quotations.timeline + `/${id}`, { params, signal });
    return response.data;
}