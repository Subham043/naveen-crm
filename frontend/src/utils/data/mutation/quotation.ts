import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { QuotationApprovalFormValuesType, QuotationPublicCreateFormValuesType, QuotationUpdateFormValuesType } from "../schema/quotation";
import { approvalQuotationHandler, createPublicQuotationHandler, updateQuotationHandler } from "../dal/quotation";
import type { PaginationType, QuotationType } from "@/utils/types";
import { QuotationQueryKey, QuotationsQueryKey } from "../query/quotation";
import { useSearchParams } from "react-router";

export const useQuotationApprovalMutation = (id: number) => {
    const { toastSuccess, toastError } = useToast();
    const [queryParams] = useSearchParams();

    return useMutation({
        mutationFn: async (values: QuotationApprovalFormValuesType) => {
            nprogress.start()
            return await approvalQuotationHandler(id, values);
        },
        onSuccess: (data, params, ___, context) => {
            toastSuccess(params.quotation_status === 1 ? "Quotation approved successfully" : "Quotation rejected successfully");
            context.client.setQueryData(QuotationsQueryKey(queryParams), (oldData: PaginationType<QuotationType> | undefined) => {
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
            context.client.setQueryData(QuotationQueryKey(id), data);
            context.client.setQueryData(QuotationQueryKey(id, true), data);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useQuotationPublicCreateMutation = () => {
    const { toastSuccess } = useToast();

    return useMutation({
        mutationFn: async (val: QuotationPublicCreateFormValuesType) => {
            nprogress.start()
            await createPublicQuotationHandler(val);
        },
        onSuccess: () => {
            toastSuccess("Quotation created successfully");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useQuotationUpdateMutation = (id: number) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: QuotationUpdateFormValuesType) => {
            nprogress.start()
            return await updateQuotationHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess(" Quotation updated successfully");
            context.client.setQueryData(QuotationsQueryKey(params), (oldData: PaginationType<QuotationType> | undefined) => {
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
            context.client.setQueryData(QuotationQueryKey(id), data);
            context.client.setQueryData(QuotationQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};