import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { salesQuotationSchema, type SalesQuotationFormValuesType } from "@/utils/data/schema/sales_quotation";
import { useSalesQuotationCreateMutation, useSalesQuotationUpdateMutation } from "@/utils/data/mutation/sales_quotation";
import { useSalesQuotationQuery } from "@/utils/data/query/sales_quotation";
import { useCallback, useEffect } from "react";

type Props = {
  modal: ExtendedModalProps<{ id: undefined }, { id: number }>;
  closeModal: () => void;
};

const salesQuotationDefaultValues: SalesQuotationFormValuesType = {
  name: "",
  email: "",
  phone: undefined,
  phone_number: undefined,
  country_code: undefined,
  billing_address: undefined,
  shipping_address: undefined,
  part_year: undefined,
  part_model: undefined,
  part_make: undefined,
  part_name: undefined,
  part_description: undefined,
  cost_price: undefined,
  sale_price: undefined,
  shipping_cost: undefined,
  lead_source: 2,
  quotation_sent: 0,
  is_active: 0,
}

export function useSalesQuotationForm({ modal, closeModal }: Props) {
  const isEdit = modal.show && modal.type === "update" && !!modal.id;
  const { data, isLoading, isFetching, isRefetching } = useSalesQuotationQuery(
    modal.type === "update" ? modal.id : 0,
    isEdit,
    isEdit
  );

  const salesQuotationCreate = useSalesQuotationCreateMutation();
  const salesQuotationUpdate = useSalesQuotationUpdateMutation(modal.type === "update" ? modal.id : 0);

  const form = useForm<SalesQuotationFormValuesType>({
    resolver: yupResolver(salesQuotationSchema) as Resolver<SalesQuotationFormValuesType>,
    defaultValues: salesQuotationDefaultValues,
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
        shipping_address: data.shipping_address ?? undefined,
        part_year: data.part_year ?? undefined,
        part_model: data.part_model ?? undefined,
        part_make: data.part_make ?? undefined,
        part_name: data.part_name ?? undefined,
        part_description: data.part_description ?? undefined,
        cost_price: data.cost_price ?? undefined,
        sale_price: data.sale_price ?? undefined,
        shipping_cost: data.shipping_cost ?? undefined,
        lead_source: data.lead_source ?? 2,
        is_active: data.is_active ? 1 : 0,
        quotation_sent: data.quotation_sent ? 1 : 0,
      });
    }

    if (modal.type === "create") {
      form.reset(salesQuotationDefaultValues);
    }
  }, [modal.show, modal.type, modal.id, data]);

  const handleClose = useCallback(() => {
    form.reset(salesQuotationDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await salesQuotationUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form as UseFormReturn<SalesQuotationFormValuesType>);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await salesQuotationCreate.mutateAsync(values as SalesQuotationFormValuesType, {
          onError: (error) => {
            handleFormServerErrors(error, form as UseFormReturn<SalesQuotationFormValuesType>);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, salesQuotationCreate.mutate, salesQuotationUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: salesQuotationCreate.isPending || salesQuotationUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
