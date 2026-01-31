import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { OrderApprovalFormValuesType, OrderPublicCreateFormValuesType } from "../schema/order";
import { approvalOrderHandler, createPublicOrderHandler } from "../dal/order";
import type { PaginationType, OrderType } from "@/utils/types";
import { OrderQueryKey, OrdersQueryKey } from "../query/order";
import { useSearchParams } from "react-router";

export const useOrderApprovalMutation = (id: number) => {
    const { toastSuccess, toastError } = useToast();
    const [queryParams] = useSearchParams();

    return useMutation({
        mutationFn: async (values: OrderApprovalFormValuesType) => {
            nprogress.start()
            return await approvalOrderHandler(id, values);
        },
        onSuccess: (data, params, ___, context) => {
            toastSuccess(params.order_status === 1 ? "Order approved successfully" : "Order rejected successfully");
            context.client.setQueryData(OrdersQueryKey(queryParams), (oldData: PaginationType<OrderType> | undefined) => {
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
            context.client.setQueryData(OrderQueryKey(id), data);
            context.client.setQueryData(OrderQueryKey(id, true), data);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useOrderPublicCreateMutation = () => {
    const { toastSuccess } = useToast();

    return useMutation({
        mutationFn: async (val: OrderPublicCreateFormValuesType) => {
            nprogress.start()
            await createPublicOrderHandler(val);
        },
        onSuccess: () => {
            toastSuccess("Order created successfully");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};