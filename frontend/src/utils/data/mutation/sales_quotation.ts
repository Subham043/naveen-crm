import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { SalesQuotationFormValuesType } from "../schema/sales_quotation";
import { createSalesQuotationHandler, submitForApprovalSalesQuotationHandler, updateSalesQuotationHandler } from "../dal/sales_quotation";
import type { PaginationType, SalesQuotationType } from "@/utils/types";
import { SalesQuotationQueryKey, SalesQuotationsQueryKey } from "../query/sales_quotation";
import { useSearchParams } from "react-router";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";

export const useSalesQuotationCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: SalesQuotationFormValuesType) => {
            nprogress.start()
            return await createSalesQuotationHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Sales Quotation created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(SalesQuotationsQueryKey(params), (oldData: PaginationType<SalesQuotationType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: SalesQuotationsQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useSalesQuotationUpdateMutation = (id: number) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: SalesQuotationFormValuesType) => {
            nprogress.start()
            return await updateSalesQuotationHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Sales Quotation updated successfully");
            context.client.setQueryData(SalesQuotationsQueryKey(params), (oldData: PaginationType<SalesQuotationType> | undefined) => {
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
            context.client.setQueryData(SalesQuotationQueryKey(id), data);
            context.client.setQueryData(SalesQuotationQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useSalesQuotationSubmitForApprovalMutation = (id: number) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await submitForApprovalSalesQuotationHandler(id);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Sales Quotation submitted for approval successfully");
            context.client.setQueryData(SalesQuotationsQueryKey(params), (oldData: PaginationType<SalesQuotationType> | undefined) => {
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
            context.client.setQueryData(SalesQuotationQueryKey(id), data);
            context.client.setQueryData(SalesQuotationQueryKey(id, true), data);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};