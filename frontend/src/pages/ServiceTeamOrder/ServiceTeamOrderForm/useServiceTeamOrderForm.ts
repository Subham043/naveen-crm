import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { serviceTeamOrderSchema, type ServiceTeamOrderFormValuesType } from "@/utils/data/schema/service_team_order";
import { useServiceTeamOrderUpdateMutation } from "@/utils/data/mutation/service_team_order";
import { useServiceTeamOrderQuery } from "@/utils/data/query/service_team_order";
import { useCallback, useEffect } from "react";

type Props = {
  modal: ExtendedModalProps<{ id: undefined }, { id: number }>;
  closeModal: () => void;
};

const serviceTeamOrderDefaultValues: ServiceTeamOrderFormValuesType = {
  total_price: undefined,
  cost_price: undefined,
  shipping_cost: undefined,
  tracking_details: undefined,
  payment_status: 0,
  invoice_status: 0,
  shipment_status: 1,
  yard_located: 0,
  yards: [],
  comment: "",
}

export function useServiceTeamOrderForm({ modal, closeModal }: Props) {
  const isEdit = modal.show && modal.type === "update" && !!modal.id;
  const { data, isLoading, isFetching, isRefetching } = useServiceTeamOrderQuery(
    modal.type === "update" ? modal.id : 0,
    isEdit,
    isEdit
  );

  const serviceTeamOrderUpdate = useServiceTeamOrderUpdateMutation(modal.type === "update" ? modal.id : 0);

  const form = useForm<ServiceTeamOrderFormValuesType>({
    resolver: yupResolver(serviceTeamOrderSchema) as Resolver<ServiceTeamOrderFormValuesType>,
    defaultValues: serviceTeamOrderDefaultValues,
  });

  useEffect(() => {
    if (!modal.show) return;
    if (modal.type === "update" && data) {
      form.reset({
        total_price: data.total_price ? data.total_price : undefined,
        cost_price: data.cost_price ? data.cost_price : undefined,
        shipping_cost: data.shipping_cost ? data.shipping_cost : undefined,
        tracking_details: data.tracking_details ? data.tracking_details : undefined,
        payment_status: data.payment_status ? data.payment_status : 0,
        invoice_status: data.invoice_status ? data.invoice_status : 0,
        shipment_status: data.shipment_status ? data.shipment_status : 1,
        yard_located: data.yard_located ? 1 : 0,
        yards: data.yards.length > 0 ? data.yards.map((yard) => ({ yard: yard.yard, id: yard.id })) : [],
        comment: "",
      });
    }
  }, [modal.show, modal.type, modal.id, data]);

  const handleClose = useCallback(() => {
    form.reset(serviceTeamOrderDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await serviceTeamOrderUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form as UseFormReturn<ServiceTeamOrderFormValuesType>);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, serviceTeamOrderUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: serviceTeamOrderUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
