import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { quotationSchema, type QuotationFormValuesType } from "@/utils/data/schema/quotation";
import { useQuotationQuery } from "@/utils/data/query/quotation";
import { useQuotationCreateMutation, useQuotationUpdateMutation } from "@/utils/data/mutation/quotation";

type Props = {
  modal: ExtendedModalProps<{ id: undefined }, { id: number }>;
  closeModal: () => void;
};

const quotationUpdateDefaultValues: QuotationFormValuesType = {
  is_edit: false,
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
  part_warranty: 1,
  part_vin: "",
  part_description: "",
  cost_price: 0,
  sale_price: 0,
  shipping_cost: 0,
  quotation_sent: 0,
}

export function useQuotationForm({ modal, closeModal }: Props) {
  const isEdit = modal.show && modal.type === "update" && !!modal.id;
  const { data, isLoading, isFetching, isRefetching } = useQuotationQuery(
    modal.type === "update" ? modal.id : 0,
    isEdit,
    isEdit
  );

  const quotationCreate = useQuotationCreateMutation();
  const quotationUpdate = useQuotationUpdateMutation(modal.type === "update" ? modal.id : 0);

  const form = useForm<QuotationFormValuesType>({
    resolver: yupResolver(quotationSchema) as Resolver<QuotationFormValuesType>,
    defaultValues: quotationUpdateDefaultValues,
  });

  useEffect(() => {
    if (!modal.show) return;
    if (modal.type === "update" && data) {
      form.reset({
        is_edit: true,
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        country_code: data.country_code ?? "+1",
        phone_number: data.phone_number ?? "+1 ",
        billing_address: data.billing_address ?? "",
        shipping_address: data.shipping_address ?? "",
        part_year: data.part_year ?? new Date().getFullYear(),
        part_model: data.part_model ?? "",
        part_make: data.part_make ?? "",
        part_name: data.part_name ?? "",
        part_number: data.part_number ?? "",
        part_warranty: data.part_warranty ?? 1,
        part_vin: data.part_vin ?? "",
        part_description: data.part_description ?? "",
        cost_price: data.cost_price ?? 0,
        sale_price: data.sale_price ?? 0,
        shipping_cost: data.shipping_cost ?? 0,
        quotation_sent: data.quotation_sent ? 1 : 0,
      });
    }

    if (modal.type === "create") {
      form.reset(quotationUpdateDefaultValues);
    }
  }, [modal.show, modal.type, modal.id, data]);

  const handleClose = useCallback(() => {
    form.reset(quotationUpdateDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await quotationUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form as UseFormReturn<QuotationFormValuesType>);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await quotationCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form as UseFormReturn<QuotationFormValuesType>);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, quotationUpdate.mutate, quotationCreate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: quotationUpdate.isPending || quotationCreate.isPending,
    onSubmit,
    handleClose,
  };
}
