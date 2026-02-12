import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { handleFormServerErrors } from "@/utils/helper";
import { orderPublicCreateSchema, type OrderPublicCreateFormValuesType } from "@/utils/data/schema/order";
import { useOrderPublicCreateMutation } from "@/utils/data/mutation/order";


const orderPublicDefaultValues: OrderPublicCreateFormValuesType = {
  name: "",
  email: "",
  phone: "",
  phone_number: "",
  country_code: "",
  part_year: new Date().getFullYear(),
  part_model: "",
  part_name: "",
  part_description: "",
  captcha: "",
}

export function useOrderPublicForm() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const orderPublicCreate = useOrderPublicCreateMutation()

  const form = useForm<OrderPublicCreateFormValuesType>({
    resolver: yupResolver(orderPublicCreateSchema),
    defaultValues: orderPublicDefaultValues,
  });

  const onSubmit = useCallback(
    form.handleSubmit((values) => {
      orderPublicCreate.mutate(values, {
        onError: (error) => {
          form.resetField("captcha")
          handleFormServerErrors(error, form);
        },
        onSuccess: () => {
          form.reset(orderPublicDefaultValues);
        },
        onSettled: () => {
          captchaRef.current?.reset();
        },
      });
    }),
    [form.handleSubmit, orderPublicCreate.mutate]
  );

  return {
    form,
    loading: orderPublicCreate.isPending,
    onSubmit,
    captchaRef
  };
}