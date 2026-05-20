import type { OrderUpdateFormValuesType } from "@/utils/data/schema/order";
import { Fieldset, SimpleGrid, Select } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

function StatusFormSection() {
  const { control } = useFormContext<OrderUpdateFormValuesType>();
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
                { value: "1", label: "Relocate" },
                { value: "2", label: "Escalation" },
                { value: "3", label: "Invoice Sent" },
                { value: "4", label: "Tracking Sent" },
                { value: "5", label: "Refund Pending From Yard" },
                { value: "6", label: "Refund Pending To Customer" },
                { value: "7", label: "Cancelled" },
                { value: "8", label: "Part Shipped" },
                { value: "9", label: "PO Sent" },
                { value: "10", label: "ChargeBack" },
                { value: "11", label: "Completed" },
              ]}
            />
          )}
        />
      </SimpleGrid>
    </Fieldset>
  );
}

export default memo(StatusFormSection);
