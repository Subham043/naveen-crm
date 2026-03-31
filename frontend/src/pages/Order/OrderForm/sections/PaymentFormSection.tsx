import type { OrderUpdateFormValuesType } from "@/utils/data/schema/order";
import { Fieldset, Select, SimpleGrid, TextInput } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

function PaymentFormSection() {
  const { control } = useFormContext<OrderUpdateFormValuesType>();

  const paymentStatus = useWatch({
    control: control,
    name: "payment_status",
  });

  return (
    <Fieldset legend="Payment Information" variant="filled" mt="md">
      <Controller
        control={control}
        name="payment_status"
        render={({ field, fieldState }) => (
          <Select
            label="Payment Status"
            value={field.value !== undefined ? field.value.toString() : "0"}
            onChange={(val) => field.onChange(val ? Number(val) : undefined)}
            error={fieldState.error?.message}
            withAsterisk
            data={[
              { value: "0", label: "Pending" },
              { value: "1", label: "Paid" },
              { value: "2", label: "Partially Paid" },
            ]}
          />
        )}
      />
      {paymentStatus !== 0 && (
        <SimpleGrid cols={{ base: 1, md: 2, lg: 2 }} mt="md">
          <Controller
            control={control}
            name="payment_gateway"
            render={({ field, fieldState }) => (
              <Select
                label="Payment Gateway"
                value={field.value !== undefined ? field.value.toString() : ""}
                onChange={(val) =>
                  field.onChange(val ? Number(val) : undefined)
                }
                error={fieldState.error?.message}
                withAsterisk
                data={[
                  { value: "1", label: "Stripe" },
                  { value: "2", label: "Boa" },
                  { value: "3", label: "Zelle" },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="transaction_id"
            render={({ field, fieldState }) => (
              <TextInput
                label="Transaction ID"
                withAsterisk
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </SimpleGrid>
      )}
    </Fieldset>
  );
}

export default memo(PaymentFormSection);
