import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  Drawer,
  Fieldset,
  Group,
  Input,
  LoadingOverlay,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useQuotationForm } from "./useQuotationForm";
import { PhoneInput } from "react-international-phone";
import { countryData } from "@/utils/helper";

type Props = {
  modal: ExtendedModalProps<{ id: undefined }, { id: number }>;
  handleModalClose: () => void;
};

/*
 *  Quotation Form Drawer
 */
export default function QuotationForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } = useQuotationForm({
    modal,
    closeModal: handleModalClose,
  });

  return (
    <Drawer
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} Quotation`}
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
                      hideDropdown={true}
                      preferredCountries={["us"]}
                      countries={countryData}
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
            <SimpleGrid cols={{ base: 1, md: 3, lg: 3 }}>
              <Controller
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
                name="part_vin"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Vin"
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
          <Fieldset legend="Status Information" variant="filled" mt="md">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
              <Controller
                control={form.control}
                name="quotation_sent"
                render={({ field, fieldState }) => (
                  <Select
                    label="Quotation Sent"
                    value={field.value ? field.value.toString() : "0"}
                    onChange={(value) =>
                      field.onChange(value ? parseInt(value) : 0)
                    }
                    error={fieldState.error?.message}
                    withAsterisk
                    data={[
                      { value: "1", label: "Yes" },
                      { value: "0", label: "No" },
                    ]}
                  />
                )}
              />
            </SimpleGrid>
          </Fieldset>
          <Group gap="xs" mt="md">
            <Button
              type="submit"
              variant="filled"
              color="cyan"
              disabled={loading}
              loading={loading}
            >
              Update
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
