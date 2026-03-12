import type { ServiceTeamOrderFormValuesType } from "@/utils/data/schema/service_team_order";
import { Fieldset, Select, SimpleGrid, Textarea } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

function LogisticFormSection() {
  const { control } = useFormContext<ServiceTeamOrderFormValuesType>();
  return (
    <Fieldset legend="Logistic Information" variant="filled" mt="md">
      <SimpleGrid cols={{ base: 1, md: 2, lg: 1 }}>
        <Controller
          control={control}
          name="tracking_details"
          render={({ field, fieldState }) => (
            <Textarea
              label="Tracking Details"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
              rows={5}
            />
          )}
        />
        <Controller
          control={control}
          name="tracking_status"
          render={({ field, fieldState }) => (
            <Select
              label="Tracking Status"
              value={field.value ? field.value.toString() : "0"}
              onChange={(val) => field.onChange(val ? Number(val) : undefined)}
              error={fieldState.error?.message}
              withAsterisk
              data={[
                { value: "0", label: "Pending" },
                { value: "1", label: "Sent" },
              ]}
            />
          )}
        />
      </SimpleGrid>
    </Fieldset>
  );
}

export default memo(LogisticFormSection);
