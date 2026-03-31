import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { handleFormServerErrors } from "@/utils/helper";
import { quotationPublicCreateSchema, type QuotationPublicCreateFormValuesType } from "@/utils/data/schema/quotation";
import { useQuotationPublicCreateMutation } from "@/utils/data/mutation/quotation";


const quotationPublicDefaultValues: QuotationPublicCreateFormValuesType = {
  name: "",
  email: "",
  phone: "",
  phone_number: "",
  country_code: "",
  part_year: new Date().getFullYear(),
  part_model: "",
  part_make: "",
  part_name: "",
  part_description: "",
  captcha: "",
}

export function useQuotationPublicForm() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const quotationPublicCreate = useQuotationPublicCreateMutation()

  const form = useForm<QuotationPublicCreateFormValuesType>({
    resolver: yupResolver(quotationPublicCreateSchema),
    defaultValues: quotationPublicDefaultValues,
  });

  const onSubmit = useCallback(
    form.handleSubmit((values) => {
      quotationPublicCreate.mutate(values, {
        onError: (error) => {
          form.resetField("captcha")
          handleFormServerErrors(error, form);
        },
        onSuccess: () => {
          form.reset(quotationPublicDefaultValues);
        },
        onSettled: () => {
          captchaRef.current?.reset();
        },
      });
    }),
    [form.handleSubmit, quotationPublicCreate.mutate]
  );

  return {
    form,
    loading: quotationPublicCreate.isPending,
    onSubmit,
    captchaRef
  };
}