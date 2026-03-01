import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { PaginationType, OrderType } from "@/utils/types";
import { OrderQueryKey, OrdersQueryKey } from "../query/order";
import { useSearchParams } from "react-router";
import type { OrderUpdateFormValuesType } from "../schema/order";
import { updateOrderHandler } from "../dal/order";


export const useOrderUpdateMutation = (id: number) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: OrderUpdateFormValuesType) => {
            nprogress.start()
            return await updateOrderHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Order updated successfully");
            context.client.setQueryData(OrdersQueryKey(params), (oldData: PaginationType<OrderType> | undefined) => {
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
        onSettled: () => {
            nprogress.complete();
        }
    });
};