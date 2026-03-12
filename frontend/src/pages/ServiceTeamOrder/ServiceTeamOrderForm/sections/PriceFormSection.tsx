import type { ServiceTeamOrderFormValuesType } from "@/utils/data/schema/service_team_order";
import { Fieldset, SimpleGrid, TextInput } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

function PriceFormSection() {
  const { control } = useFormContext<ServiceTeamOrderFormValuesType>();
  return (
    <Fieldset legend="Pricing Information" variant="filled" mt="md">
      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
        <Controller
          control={control}
          name="sale_price"
          render={({ field, fieldState }) => (
            <TextInput
              label="Sale Price"
              type="number"
              value={field.value ? field.value : undefined}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
        <Controller
          control={control}
          name="cost_price"
          render={({ field, fieldState }) => (
            <TextInput
              label="Cost Price"
              type="number"
              value={field.value ? field.value : undefined}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
        <Controller
          control={control}
          name="shipping_cost"
          render={({ field, fieldState }) => (
            <TextInput
              label="Shipping Cost"
              type="number"
              value={field.value ? field.value : undefined}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
      </SimpleGrid>
    </Fieldset>
  );
}

export default memo(PriceFormSection);
