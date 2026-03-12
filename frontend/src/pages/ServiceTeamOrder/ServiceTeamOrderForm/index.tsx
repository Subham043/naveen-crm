import { Controller, useFieldArray, useWatch } from "react-hook-form";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Drawer,
  Fieldset,
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
import { IconPlus } from "@tabler/icons-react";
import { PhoneInput } from "react-international-phone";

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

  const paymentStatus = useWatch({
    control: form.control,
    name: "payment_status",
  });

  const yardLocated = useWatch({
    control: form.control,
    name: "yard_located",
  });

  const additionalCommentRequired = useWatch({
    control: form.control,
    name: "additional_comment_required",
  });

  const { fields: yards, insert: yardsInsert } = useFieldArray({
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
      size="60%"
    >
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={onSubmit}>
          <Fieldset legend="Customer Information" variant="filled">
            <SimpleGrid cols={{ base: 1, md: 3, lg: 3 }}>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Name"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    withAsterisk
                    data-autofocus
                  />
                )}
              />
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Email"
                    placeholder="me@company.dev"
                    type="email"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    withAsterisk
                  />
                )}
              />
              <Controller
                control={form.control}
                name="phone_number"
                render={({ field, fieldState }) => (
                  <Input.Wrapper
                    label="Phone Number"
                    error={fieldState.error?.message}
                    withAsterisk
                  >
                    <PhoneInput
                      defaultCountry="us"
                      value={field.value}
                      disableFormatting={true}
                      onChange={(phoneNumber, meta) => {
                        const [countryCode, phone] = meta.inputValue.split(" ");
                        field.onChange(phoneNumber);
                        form.setValue("country_code", countryCode);
                        form.setValue("phone", phone);
                      }}
                      inputStyle={{ width: "100%" }}
                    />
                  </Input.Wrapper>
                )}
              />
            </SimpleGrid>
          </Fieldset>
          <Fieldset legend="Part Information" variant="filled" mt="md">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }}>
              <Controller
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
              control={form.control}
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
          <Fieldset legend="Pricing Information" variant="filled" mt="md">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
              <Controller
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
          <Fieldset legend="Address Information" variant="filled" mt="md">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2 }}>
              <Controller
                control={form.control}
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
                control={form.control}
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
          <Fieldset legend="Logistic Information" variant="filled" mt="md">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 1 }}>
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
                  />
                )}
              />
              <Controller
                control={form.control}
                name="tracking_status"
                render={({ field, fieldState }) => (
                  <Select
                    label="Tracking Status"
                    value={field.value ? field.value.toString() : "0"}
                    onChange={(val) =>
                      field.onChange(val ? Number(val) : undefined)
                    }
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
          <Fieldset legend="Payment Information" variant="filled" mt="md">
            <Controller
              control={form.control}
              name="payment_status"
              render={({ field, fieldState }) => (
                <Select
                  label="Payment Status"
                  value={
                    field.value !== undefined ? field.value.toString() : "0"
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
            {paymentStatus !== 0 && (
              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} mt="md">
                <Controller
                  control={form.control}
                  name="payment_card_type"
                  render={({ field, fieldState }) => (
                    <Select
                      label="Payment Card Type"
                      value={
                        field.value !== undefined ? field.value.toString() : ""
                      }
                      onChange={(val) =>
                        field.onChange(val ? Number(val) : undefined)
                      }
                      error={fieldState.error?.message}
                      withAsterisk
                      data={[
                        { value: "1", label: "Mastercard" },
                        { value: "2", label: "Visa" },
                        { value: "3", label: "Amex" },
                        { value: "4", label: "Zelle" },
                      ]}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="payment_gateway"
                  render={({ field, fieldState }) => (
                    <Select
                      label="Payment Gateway"
                      value={
                        field.value !== undefined ? field.value.toString() : ""
                      }
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
                  control={form.control}
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
          <Fieldset legend="Status Information" variant="filled" mt="md">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
              <Controller
                control={form.control}
                name="invoice_status"
                render={({ field, fieldState }) => (
                  <Select
                    label="Invoice Status"
                    value={
                      field.value !== undefined ? field.value.toString() : "0"
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
                    value={field.value ? field.value.toString() : "1"}
                    onChange={(val) =>
                      field.onChange(val ? Number(val) : undefined)
                    }
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
                control={form.control}
                name="order_status"
                render={({ field, fieldState }) => (
                  <Select
                    label="Order Status"
                    value={field.value ? field.value.toString() : "0"}
                    onChange={(val) =>
                      field.onChange(val ? Number(val) : undefined)
                    }
                    error={fieldState.error?.message}
                    withAsterisk
                    data={[
                      { value: "0", label: "Pending" },
                      { value: "1", label: "Escalation" },
                      { value: "2", label: "Cancelled" },
                      { value: "3", label: "Relocate Po Sent" },
                      { value: "4", label: "Pending For Refund" },
                      { value: "5", label: "Refunded" },
                      { value: "6", label: "Pending Part Shipped" },
                      { value: "7", label: "Completed" },
                      { value: "8", label: "ChargeBack" },
                      { value: "9", label: "Yard Relocate" },
                    ]}
                  />
                )}
              />
            </SimpleGrid>
          </Fieldset>
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
              <Box p="sm" pos="relative" bg={"var(--mantine-color-cyan-light)"}>
                <Group justify="space-between" gap={10}>
                  <Box>
                    <Title order={5}>Yard Information</Title>
                    {form.formState.errors.yards?.message && (
                      <Input.Error>
                        {form.formState.errors.yards?.message}
                      </Input.Error>
                    )}
                  </Box>
                  <ActionIcon
                    variant="filled"
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
              <Divider />
              <Box>
                <Table horizontalSpacing="sm">
                  <Table.Tbody>
                    {yards.length > 0 ? (
                      yards.map((_, index) => (
                        <Table.Tr key={index} bg={"#c7c7c71a"}>
                          <Table.Td w="5px">{index + 1}.</Table.Td>
                          <Table.Td>
                            <Controller
                              name={`yards.${index}.yard`}
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Textarea
                                  placeholder={`Yard ${index + 1}`}
                                  value={field.value ? field.value : ""}
                                  onChange={field.onChange}
                                  error={fieldState.error?.message}
                                  withAsterisk
                                  rows={3}
                                />
                              )}
                            />
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
          <Fieldset legend="Comment Information" variant="filled" mt="md">
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
                />
              )}
            />
            <Controller
              name="additional_comment_required"
              control={form.control}
              render={({ field, fieldState }) => (
                <Switch
                  label="Additional Comment Required"
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                  error={fieldState.error?.message}
                  mt="md"
                />
              )}
            />
            {additionalCommentRequired === 1 && (
              <Controller
                control={form.control}
                name="additional_comment"
                render={({ field, fieldState }) => (
                  <Textarea
                    label="Additional Comment"
                    value={field.value ? field.value : ""}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    rows={5}
                    withAsterisk
                    mt="md"
                  />
                )}
              />
            )}
          </Fieldset>
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
