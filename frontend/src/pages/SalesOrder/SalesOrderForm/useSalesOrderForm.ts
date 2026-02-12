import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { salesOrderSchema, type SalesOrderFormValuesType } from "@/utils/data/schema/sales_order";
import { useSalesOrderCreateMutation, useSalesOrderUpdateMutation } from "@/utils/data/mutation/sales_order";
import { useSalesOrderQuery } from "@/utils/data/query/sales_order";
import { useCallback, useEffect } from "react";

type Props = {
  modal: ExtendedModalProps<{ id: undefined }, { id: number }>;
  closeModal: () => void;
};

const salesOrderDefaultValues: SalesOrderFormValuesType = {
  name: "",
  email: "",
  phone: undefined,
  phone_number: undefined,
  country_code: undefined,
  billing_address: undefined,
  part_year: undefined,
  part_model: undefined,
  part_name: undefined,
  part_description: undefined,
  lead_source: 2,
  is_active: 0,
}

export function useSalesOrderForm({ modal, closeModal }: Props) {
  const isEdit = modal.show && modal.type === "update" && !!modal.id;
  const { data, isLoading, isFetching, isRefetching } = useSalesOrderQuery(
    modal.type === "update" ? modal.id : 0,
    isEdit,
    isEdit
  );

  const salesOrderCreate = useSalesOrderCreateMutation();
  const salesOrderUpdate = useSalesOrderUpdateMutation(modal.type === "update" ? modal.id : 0);

  const form = useForm<SalesOrderFormValuesType>({
    resolver: yupResolver(salesOrderSchema) as Resolver<SalesOrderFormValuesType>,
    defaultValues: salesOrderDefaultValues,
  });

  useEffect(() => {
    if (!modal.show) return;
    if (modal.type === "update" && data) {
      form.reset({
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? undefined,
        country_code: data.country_code ?? undefined,
        phone_number: data.phone_number ?? undefined,
        billing_address: data.billing_address ?? undefined,
        part_year: data.part_year ?? undefined,
        part_model: data.part_model ?? undefined,
        part_name: data.part_name ?? undefined,
        part_description: data.part_description ?? undefined,
        lead_source: data.lead_source ?? 2,
        is_active: data.is_active ? 1 : 0,
      });
    }

    if (modal.type === "create") {
      form.reset(salesOrderDefaultValues);
    }
  }, [modal.show, modal.type, modal.id, data]);

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
