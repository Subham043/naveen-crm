import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationQueryType, PaginationType, ServiceTeamOrderType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { ServiceTeamOrderFormValuesType } from "@/utils/data/schema/service_team_order";

export const updateServiceTeamOrderHandler = async (id: number, val: ServiceTeamOrderFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: ServiceTeamOrderType }>(api_routes.serviceTeam.orders.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const getServiceTeamOrderHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ServiceTeamOrderType }>(api_routes.serviceTeam.orders.view + `/${id}`, { signal });
    return response.data.data;
}

export const getServiceTeamOrdersHandler = async (query: PaginationQueryType, signal?: GenericAbortSignal | undefined) => {
    const { page = 1, total = 10, search = "" } = query;
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (total) params.append("total", total.toString());
    if (search) params.append("filter[search]", search);
    const response = await axios.get<PaginationType<ServiceTeamOrderType>>(api_routes.serviceTeam.orders.paginate, { params, signal });
    return response.data;
}