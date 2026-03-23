import type { OrderUpdateFormValuesType } from "@/utils/data/schema/order";
import { Fieldset, SimpleGrid, TextInput, Textarea } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

function PartFormSection() {
  const { control } = useFormContext<OrderUpdateFormValuesType>();
  return (
    <Fieldset legend="Part Information" variant="filled" mt="md">
      <SimpleGrid cols={{ base: 1, md: 3, lg: 3 }}>
        <Controller
          control={control}
          name="part_year"
          render={({ field, fieldState }) => (
            <TextInput
              label="Year"
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
          name="part_make"
          render={({ field, fieldState }) => (
            <TextInput
              label="Make"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
        <Controller
          control={control}
          name="part_model"
          render={({ field, fieldState }) => (
            <TextInput
              label="Model"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, md: 2, lg: 2 }} mt="md">
        <Controller
          control={control}
          name="part_name"
          render={({ field, fieldState }) => (
            <TextInput
              label="Name"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
        <Controller
          control={control}
          name="part_number"
          render={({ field, fieldState }) => (
            <TextInput
              label="Number"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
      </SimpleGrid>
      <Controller
        control={control}
        name="part_description"
        render={({ field, fieldState }) => (
          <Textarea
            label="Description"
            value={field.value ? field.value : ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            withAsterisk
            rows={5}
            mt="md"
          />
        )}
      />
    </Fieldset>
  );
}

export default memo(PartFormSection);
