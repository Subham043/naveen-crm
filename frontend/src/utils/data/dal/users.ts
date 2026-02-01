import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, UserType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { UserCreateFormValuesType } from "@/utils/data/schema/user";
import type { UserUpdateFormValuesType } from "@/utils/data/schema/user";

export const createUserHandler = async (val: UserCreateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: UserType }>(api_routes.users.create, val, { signal });
    return response.data.data;
}

export const updateUserHandler = async (id: number, val: UserUpdateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: UserType }>(api_routes.users.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const deleteUserHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: UserType }>(api_routes.users.delete + `/${id}`, { signal });
}

export const toggleUserStatusHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: UserType }>(api_routes.users.status + `/${id}`, { signal });
    return response.data.data;
}

export const verifyUserHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: UserType }>(api_routes.users.verify + `/${id}`, { signal });
    return response.data.data;
}

export const getUserHandler = async (id: number, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: UserType }>(api_routes.users.view + `/${id}`, { signal });
    return response.data.data;
}

export const getUsersHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<PaginationType<UserType>>(api_routes.users.paginate, { params, signal });
    return response.data;
}