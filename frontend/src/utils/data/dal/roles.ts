import type { GenericAbortSignal } from "axios";
import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { RoleType } from "@/utils/types";


export const getRolesHandler = async (search: string, signal?: GenericAbortSignal | undefined) => {
    const params = new URLSearchParams();
    if (search) params.append("filter[search]", encodeURIComponent(search));
    const response = await axios.get<{ data: RoleType[] }>(api_routes.roles, { params, signal });
    return response.data.data;
}