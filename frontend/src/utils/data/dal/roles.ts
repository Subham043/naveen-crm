import type { GenericAbortSignal } from "axios";
import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { RoleType } from "@/utils/types";


export const getRolesHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: RoleType[] }>(api_routes.roles, { params, signal });
    return response.data.data;
}