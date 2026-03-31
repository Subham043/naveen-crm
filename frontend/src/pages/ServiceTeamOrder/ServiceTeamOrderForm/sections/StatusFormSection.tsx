import type { ServiceTeamOrderFormValuesType } from "@/utils/data/schema/service_team_order";
import { Fieldset, SimpleGrid, Select } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

function StatusFormSection() {
  const { control } = useFormContext<ServiceTeamOrderFormValuesType>();
  return (
    <Fieldset legend="Status Information" variant="filled" mt="md">
      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
        <Controller
          control={control}
          name="invoice_status"
          render={({ field, fieldState }) => (
            <Select
              label="Invoice Status"
              value={field.value !== undefined ? field.value.toString() : "0"}
              onChange={(val) => field.onChange(val ? Number(val) : undefined)}
              error={fieldState.error?.message}
              withAsterisk
              data={[
                { value: "0", label: "Not Generated" },
                { value: "1", label: "Generated" },
                { value: "2", label: "Sent" },
              ]}
            />
          )}
        />
        <Controller
          control={control}
          name="po_status"
          render={({ field, fieldState }) => (
            <Select
              label="PO Status"
              value={field.value ? field.value.toString() : "1"}
              onChange={(val) => field.onChange(val ? Number(val) : undefined)}
              error={fieldState.error?.message}
              withAsterisk
              data={[
                { value: "1", label: "PO Pending" },
                { value: "2", label: "PO Sent" },
              ]}
            />
          )}
        />
        <Controller
          control={control}
          name="order_status"
          render={({ field, fieldState }) => (
            <Select
              label="Order Status"
              value={field.value ? field.value.toString() : "0"}
              onChange={(val) => field.onChange(val ? Number(val) : undefined)}
              error={fieldState.error?.message}
              withAsterisk
              data={[
                { value: "0", label: "Pending" },
                { value: "1", label: "Escalation" },
                { value: "2", label: "Cancelled" },
                { value: "3", label: "Pending For Refund" },
                { value: "4", label: "Refunded" },
                { value: "5", label: "Part Shipped" },
                { value: "6", label: "Completed" },
                { value: "7", label: "ChargeBack" },
              ]}
            />
          )}
        />
      </SimpleGrid>
    </Fieldset>
  );
}

export default memo(StatusFormSection);
