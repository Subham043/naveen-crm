import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { ServiceTeamOrderFormValuesType } from "../schema/service_team_order";
import { updateServiceTeamOrderHandler } from "../dal/service_team_order";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationQueryType, PaginationType, ServiceTeamOrderType } from "@/utils/types";
import { ServiceTeamOrderQueryKey, ServiceTeamOrdersQueryKey } from "../query/service_team_order";

export const useServiceTeamOrderUpdateMutation = (id: number) => {
    const { toastSuccess } = useToast();
    const { page, total } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, total, search };

    return useMutation({
        mutationFn: async (val: ServiceTeamOrderFormValuesType) => {
            nprogress.start()
            return await updateServiceTeamOrderHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Service Team Order updated successfully");
            context.client.setQueryData(ServiceTeamOrdersQueryKey(query), (oldData: PaginationType<ServiceTeamOrderType> | undefined) => {
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
            context.client.setQueryData(ServiceTeamOrderQueryKey(id), data);
            context.client.setQueryData(ServiceTeamOrderQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};