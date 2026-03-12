import type { OrderUpdateFormValuesType } from "@/utils/data/schema/order";
import { Fieldset, SimpleGrid, Textarea } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

function AddressFormSection() {
  const { control } = useFormContext<OrderUpdateFormValuesType>();
  return (
    <Fieldset legend="Address Information" variant="filled" mt="md">
      <SimpleGrid cols={{ base: 1, md: 2, lg: 2 }}>
        <Controller
          control={control}
          name="billing_address"
          render={({ field, fieldState }) => (
            <Textarea
              label="Billing Address"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
              rows={5}
            />
          )}
        />
        <Controller
          control={control}
          name="shipping_address"
          render={({ field, fieldState }) => (
            <Textarea
              label="Shipping Address"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
              rows={5}
            />
          )}
        />
      </SimpleGrid>
    </Fieldset>
  );
}

export default memo(AddressFormSection);
