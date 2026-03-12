import type { OrderUpdateFormValuesType } from "@/utils/data/schema/order";
import { Fieldset, SimpleGrid, TextInput, Textarea } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

function PartFormSection() {
  const { control } = useFormContext<OrderUpdateFormValuesType>();
  return (
    <Fieldset legend="Part Information" variant="filled" mt="md">
      <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }}>
        <Controller
          control={control}
          name="part_year"
          render={({ field, fieldState }) => (
            <TextInput
              label="Part Year"
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
          name="part_model"
          render={({ field, fieldState }) => (
            <TextInput
              label="Part Model"
              value={field.value ? field.value : ""}
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
              label="Part Make"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
        <Controller
          control={control}
          name="part_name"
          render={({ field, fieldState }) => (
            <TextInput
              label="Part Name"
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
            label="Part Description"
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
