import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { salesOrderSchema, type SalesOrderFormValuesType } from "@/utils/data/schema/sales_order";
import { useSalesOrderCreateMutation, useSalesOrderUpdateMutation } from "@/utils/data/mutation/sales_order";
import { useSalesOrderQuery } from "@/utils/data/query/sales_order";
import { useCallback, useEffect } from "react";

type Props = {
  modal: ExtendedModalProps<{ id: number }>;
  closeModal: () => void;
};

const salesOrderDefaultValues: SalesOrderFormValuesType = {
  name: "",
  email: "",
  phone: undefined,
  phone_number: undefined,
  country_code: undefined,
  billing_address: undefined,
  part_name: undefined,
  part_description: undefined,
  lead_source: 2,
  is_active: 0,
}

export function useSalesOrderForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useSalesOrderQuery(
    modal.type === "update" ? modal.id : 0,
    modal.show && modal.type === "update"
  );

  const salesOrderCreate = useSalesOrderCreateMutation();
  const salesOrderUpdate = useSalesOrderUpdateMutation(modal.type === "update" ? modal.id : 0);

  const form = useForm<SalesOrderFormValuesType>({
    resolver: yupResolver(salesOrderSchema) as Resolver<SalesOrderFormValuesType>,
    defaultValues: salesOrderDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          name: data ? data.name : "",
          email: data ? data.email : "",
          phone: data && data.phone ? data.phone : undefined,
          country_code: data && data.country_code ? data.country_code : undefined,
          phone_number: data && data.phone_number ? data.phone_number : undefined,
          billing_address: data && data.billing_address ? data.billing_address : undefined,
          part_name: data && data.part_name ? data.part_name : undefined,
          part_description: data && data.part_description ? data.part_description : undefined,
          lead_source: data && data.lead_source ? data.lead_source : undefined,
          is_active: data && data.is_active === true ? 1 : 0,
        });
      } else {
        form.reset(salesOrderDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(salesOrderDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await salesOrderUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form as UseFormReturn<SalesOrderFormValuesType>);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await salesOrderCreate.mutateAsync(values as SalesOrderFormValuesType, {
          onError: (error) => {
            handleFormServerErrors(error, form as UseFormReturn<SalesOrderFormValuesType>);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, salesOrderCreate.mutate, salesOrderUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: salesOrderCreate.isPending || salesOrderUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
