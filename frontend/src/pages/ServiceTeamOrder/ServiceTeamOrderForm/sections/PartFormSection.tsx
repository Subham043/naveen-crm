import type { ServiceTeamOrderFormValuesType } from "@/utils/data/schema/service_team_order";
import {
  Fieldset,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
} from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

function PartFormSection() {
  const { control } = useFormContext<ServiceTeamOrderFormValuesType>();
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
              label="Part"
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
              label="Part#"
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
          name="part_warranty"
          render={({ field, fieldState }) => (
            <Select
              label="Warranty (In Months)"
              data={Array.from({ length: 12 }, (_, i) => ({
                value: (i + 1).toString(),
                label: (i + 1).toString(),
              }))}
              value={field.value ? field.value.toString() : "1"}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
        <Controller
          control={control}
          name="part_vin"
          render={({ field, fieldState }) => (
            <TextInput
              label="Vin"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
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
