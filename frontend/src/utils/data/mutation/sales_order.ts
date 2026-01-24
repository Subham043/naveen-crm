import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { SalesOrderFormValuesType } from "../schema/sales_order";
import { createSalesOrderHandler, submitForApprovalSalesOrderHandler, updateSalesOrderHandler } from "../dal/sales_order";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationQueryType, PaginationType, SalesOrderType } from "@/utils/types";
import { SalesOrderQueryKey, SalesOrdersQueryKey } from "../query/sales_order";

export const useSalesOrderCreateMutation = () => {
    const { toastSuccess } = useToast();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useMutation({
        mutationFn: async (val: SalesOrderFormValuesType) => {
            nprogress.start()
            return await createSalesOrderHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Sales Order created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(SalesOrdersQueryKey(query), (oldData: PaginationType<SalesOrderType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: SalesOrdersQueryKey(query) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useSalesOrderUpdateMutation = (id: number) => {
    const { toastSuccess } = useToast();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useMutation({
        mutationFn: async (val: SalesOrderFormValuesType) => {
            nprogress.start()
            return await updateSalesOrderHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Sales Order updated successfully");
            context.client.setQueryData(SalesOrdersQueryKey(query), (oldData: PaginationType<SalesOrderType> | undefined) => {
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
            context.client.setQueryData(SalesOrderQueryKey(id), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useSalesOrderSubmitForApprovalMutation = (id: number) => {
    const { toastSuccess, toastError } = useToast();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await submitForApprovalSalesOrderHandler(id);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Sales Order submitted for approval successfully");
            context.client.setQueryData(SalesOrdersQueryKey(query), (oldData: PaginationType<SalesOrderType> | undefined) => {
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
            context.client.setQueryData(SalesOrderQueryKey(id), data);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};