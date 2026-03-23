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
  name: "",
  email: "",
  phone: "",
  phone_number: "+1 ",
  country_code: "+1",
  billing_address: "",
  shipping_address: "",
  part_year: new Date().getFullYear(),
  part_model: "",
  part_make: "",
  part_name: "",
  part_number: "",
  part_description: "",
  cost_price: 0,
  sale_price: 0,
  shipping_cost: 0,
  tracking_details: undefined,
  tracking_status: 0,
  payment_status: 0,
  payment_card_type: undefined,
  payment_gateway: undefined,
  transaction_id: undefined,
  invoice_status: 0,
  po_status: 1,
  order_status: 0,
  yard_located: 0,
  yards: [],
  comment: "",
  additional_comment_required: 0,
  additional_comment: undefined,
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
        name: data.quotation_info ? data.quotation_info.name : "",
        email: data.quotation_info ? data.quotation_info.email : "",
        phone: data.quotation_info ? data.quotation_info.phone : "",
        phone_number: data.quotation_info ? data.quotation_info.phone_number : "",
        country_code: data.quotation_info ? data.quotation_info.country_code : "",
        billing_address: data.quotation_info ? data.quotation_info.billing_address : "",
        shipping_address: data.quotation_info ? data.quotation_info.shipping_address : "",
        part_year: data.quotation_info ? data.quotation_info.part_year : new Date().getFullYear(),
        part_model: data.quotation_info ? data.quotation_info.part_model : "",
        part_make: data.quotation_info ? data.quotation_info.part_make : "",
        part_name: data.quotation_info ? data.quotation_info.part_name : "",
        part_number: data.quotation_info ? data.quotation_info.part_number : "",
        part_description: data.quotation_info ? data.quotation_info.part_description : "",
        cost_price: data.quotation_info && data.quotation_info.cost_price !== undefined ? data.quotation_info.cost_price : 0,
        sale_price: data.quotation_info && data.quotation_info.sale_price !== undefined ? data.quotation_info.sale_price : 0,
        shipping_cost: data.quotation_info && data.quotation_info.shipping_cost !== undefined ? data.quotation_info.shipping_cost : 0,
        tracking_details: data.tracking_details ? data.tracking_details : undefined,
        tracking_status: data.tracking_status && data.tracking_status !== undefined ? data.tracking_status : 0,
        payment_status: data.payment_status && data.payment_status !== undefined ? data.payment_status : 0,
        payment_card_type: data.payment_card_type ? data.payment_card_type : undefined,
        payment_gateway: data.payment_gateway ? data.payment_gateway : undefined,
        transaction_id: data.transaction_id ? data.transaction_id : undefined,
        invoice_status: data.invoice_status && data.invoice_status !== undefined ? data.invoice_status : 0,
        po_status: data.po_status && data.po_status !== undefined ? data.po_status : 1,
        order_status: data.order_status !== 0 ? data.order_status : 0,
        yard_located: data.yard_located ? 1 : 0,
        yards: data.yards.length > 0 ? data.yards.map((yard) => ({ yard: yard.yard, id: yard.id })) : [],
        comment: "",
        additional_comment_required: 0,
        additional_comment: undefined,
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
