import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { usePasswordUpdateMutation } from "@/utils/data/mutation/profile";
import { handleFormServerErrors } from "@/utils/helper";
import { passwordUpdateFormSchema, type PasswordUpdateFormValuesType } from "@/utils/data/schema/profile";

export function usePasswordUpdateForm() {
  const passwordUpdate = usePasswordUpdateMutation();

  const form = useForm<PasswordUpdateFormValuesType>({
    resolver: yupResolver(passwordUpdateFormSchema),
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    }
  });

  const onSubmit = useCallback(
    form.handleSubmit((values) => {
      passwordUpdate.mutate(values, {
        onError: (error) => {
          handleFormServerErrors(error, form);
        },
        onSuccess: () => {
          form.reset({
            old_password: "",
            password: "",
            confirm_password: "",
          });
        }
      });
    }),
    [form.handleSubmit, passwordUpdate.mutate]
  );

  return {
    form,
    loading: passwordUpdate.isPending,
    onSubmit,
  };
}
