import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { UserCreateFormValuesType, UserUpdateFormValuesType } from "../schema/user";
import { createUserHandler, deleteUserHandler, toggleUserStatusHandler, updateUserHandler, verifyUserHandler } from "../dal/users";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationQueryType, PaginationType, UserType } from "@/utils/types";
import { UserQueryKey, UsersQueryKey } from "../query/user";

export const useUserCreateMutation = () => {
    const { toastSuccess } = useToast();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useMutation({
        mutationFn: async (val: UserCreateFormValuesType) => {
            nprogress.start()
            return await createUserHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("User created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(UsersQueryKey(query), (oldData: PaginationType<UserType> | undefined) => {
                    if (!oldData) return oldData;
                    if (oldData.data.length < total) {
                        return {
                            ...oldData,
                            data: [data, ...oldData.data],
                            meta: {
                                ...oldData.meta,
                                total: oldData.meta.total + 1,
                            },
                        };
                    } else {
                        const newData = [...oldData.data];
                        newData.splice(total - 1, 0, data);
                        return {
                            ...oldData,
                            data: [data, ...newData],
                            meta: {
                                ...oldData.meta,
                                total: oldData.meta.total + 1,
                            },
                        };
                    }
                });
            } else {
                context.client.invalidateQueries({ queryKey: UsersQueryKey(query) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useUserUpdateMutation = (id: number) => {
    const { toastSuccess } = useToast();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useMutation({
        mutationFn: async (val: UserUpdateFormValuesType) => {
            nprogress.start()
            return await updateUserHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("User updated successfully");
            context.client.setQueryData(UsersQueryKey(query), (oldData: PaginationType<UserType> | undefined) => {
                if (!oldData) return oldData;
                const oldUserDataIndex = oldData.data.findIndex((user) => user.id === id);
                if (oldUserDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldUserDataIndex] = data;
                    return {
                        ...oldData,
                        data: newData,
                    };
                }
                return oldData;
            });
            context.client.setQueryData(UserQueryKey(id), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useUserDeleteMutation = (id: number) => {
    const { toastSuccess } = useToast();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteUserHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("User deleted successfully");
            context.client.invalidateQueries({ queryKey: UsersQueryKey(query) });
            context.client.setQueryData(UserQueryKey(id), undefined);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useUserVerifyMutation = (id: number) => {
    const { toastSuccess } = useToast();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await verifyUserHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("User verified successfully");
            context.client.setQueryData(UsersQueryKey(query), (oldData: PaginationType<UserType> | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.map((user) => user.id === id ? { ...user, verified: "VERIFIED" } : user),
                };
            });
            context.client.setQueryData(UserQueryKey(id), (oldData: UserType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, verified: "VERIFIED" };
            });
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useUserToggleStatusMutation = (id: number) => {
    const { toastSuccess } = useToast();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await toggleUserStatusHandler(id);
        },
        onSuccess: (data, _, ___, context) => {
            toastSuccess("User status toggled successfully");
            context.client.setQueryData(UsersQueryKey(query), (oldData: PaginationType<UserType> | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.map((user) => user.id === id ? { ...user, is_blocked: data.is_blocked } : user),
                };
            });
            context.client.setQueryData(UserQueryKey(id), (oldData: UserType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, is_blocked: data.is_blocked };
            });
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};