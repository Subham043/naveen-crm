import { Controller, useFieldArray, useWatch } from "react-hook-form";
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Group,
  Input,
  LoadingOverlay,
  Paper,
  Select,
  SimpleGrid,
  Switch,
  Table,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useServiceTeamOrderForm } from "./useServiceTeamOrderForm";
import TableRowNotFound from "@/components/TableRowNotFound";
import { IconPlus, IconTrash } from "@tabler/icons-react";

type Props = {
  modal: ExtendedModalProps<{ id: undefined }, { id: number }>;
  handleModalClose: () => void;
};

/*
 * Service Team Order Form Drawer
 */
export default function ServiceTeamOrderForm({
  modal,
  handleModalClose,
}: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } =
    useServiceTeamOrderForm({
      modal,
      closeModal: handleModalClose,
    });

  const yardLocated = useWatch({
    control: form.control,
    name: "yard_located",
  });

  const {
    fields: yards,
    insert: yardsInsert,
    remove: yardsRemove,
  } = useFieldArray({
    control: form.control,
    name: "yards",
  });

  return (
    <Drawer
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} Order`}
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      size="xl"
    >
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={onSubmit}>
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
            <Controller
              control={form.control}
              name="total_price"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Total Price"
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  data-autofocus
                />
              )}
            />
            <Controller
              control={form.control}
              name="cost_price"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Cost Price"
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="shipping_cost"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Shipping Cost"
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </SimpleGrid>
          <Controller
            control={form.control}
            name="tracking_details"
            render={({ field, fieldState }) => (
              <Textarea
                label="Tracking Details"
                value={field.value ? field.value : ""}
                onChange={field.onChange}
                error={fieldState.error?.message}
                rows={5}
                mt="md"
              />
            )}
          />
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} mt="md">
            <Controller
              control={form.control}
              name="payment_status"
              render={({ field, fieldState }) => (
                <Select
                  label="Payment Status"
                  value={
                    field.value !== undefined ? field.value.toString() : ""
                  }
                  onChange={(val) =>
                    field.onChange(val ? Number(val) : undefined)
                  }
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
            <Controller
              control={form.control}
              name="invoice_status"
              render={({ field, fieldState }) => (
                <Select
                  label="Invoice Status"
                  value={
                    field.value !== undefined ? field.value.toString() : ""
                  }
                  onChange={(val) =>
                    field.onChange(val ? Number(val) : undefined)
                  }
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
              control={form.control}
              name="shipment_status"
              render={({ field, fieldState }) => (
                <Select
                  label="Shipment Status"
                  value={field.value ? field.value.toString() : ""}
                  onChange={(val) =>
                    field.onChange(val ? Number(val) : undefined)
                  }
                  error={fieldState.error?.message}
                  withAsterisk
                  data={[
                    { value: "1", label: "Processing" },
                    { value: "2", label: "Shipped" },
                    { value: "3", label: "Delivered" },
                    { value: "4", label: "Closed" },
                    { value: "5", label: "Cancelled" },
                  ]}
                />
              )}
            />
          </SimpleGrid>
          <Controller
            name="yard_located"
            control={form.control}
            render={({ field, fieldState }) => (
              <Switch
                label="Is Yard Located?"
                checked={field.value === 1}
                onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                error={fieldState.error?.message}
                mt="md"
              />
            )}
          />
          {yardLocated === 1 && (
            <Paper shadow="xs" withBorder mt="md">
              <Box p="sm" pos="relative">
                <Group justify="space-between" gap={10}>
                  <Box>
                    <Title order={5}>YARD DETAILS</Title>
                    {form.formState.errors.yards?.message && (
                      <Input.Error>
                        {form.formState.errors.yards?.message}
                      </Input.Error>
                    )}
                  </Box>
                  <ActionIcon
                    variant="outline"
                    color="cyan"
                    onClick={() =>
                      yardsInsert(yards.length, { yard: "", id: undefined })
                    }
                  >
                    <IconPlus
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Group>
              </Box>
              <Box>
                <Table horizontalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr bg={"var(--mantine-color-blue-light)"}>
                      <Table.Th>YARD</Table.Th>
                      <Table.Th w="50px" />
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {yards.length > 0 ? (
                      yards.map((_, index) => (
                        <Table.Tr key={index}>
                          <Table.Td>
                            <Controller
                              name={`yards.${index}.yard`}
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Textarea
                                  placeholder="Yard"
                                  value={field.value ? field.value : ""}
                                  onChange={field.onChange}
                                  error={fieldState.error?.message}
                                  withAsterisk
                                  rows={3}
                                />
                              )}
                            />
                          </Table.Td>
                          <Table.Td>
                            <ActionIcon
                              variant="outline"
                              color="red"
                              onClick={() => yardsRemove(index)}
                            >
                              <IconTrash
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                              />
                            </ActionIcon>
                          </Table.Td>
                        </Table.Tr>
                      ))
                    ) : (
                      <TableRowNotFound
                        colSpan={2}
                        message="No yard found. Please click on plus icon to add yard"
                      />
                    )}
                  </Table.Tbody>
                </Table>
              </Box>
            </Paper>
          )}
          <Controller
            control={form.control}
            name="comment"
            render={({ field, fieldState }) => (
              <Textarea
                label="Comment"
                value={field.value ? field.value : ""}
                onChange={field.onChange}
                error={fieldState.error?.message}
                rows={5}
                withAsterisk
                mt="md"
              />
            )}
          />
          <Group gap="xs" mt="md">
            <Button
              type="submit"
              variant="filled"
              color="blue"
              disabled={loading}
              loading={loading}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="filled"
              color="red"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Box>
    </Drawer>
  );
}
