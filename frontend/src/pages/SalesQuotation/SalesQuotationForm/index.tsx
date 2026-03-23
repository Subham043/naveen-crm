import { Controller, useWatch } from "react-hook-form";
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
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useSalesQuotationForm } from "./useSalesQuotationForm";
import { PhoneInput } from "react-international-phone";
import { countryData } from "@/utils/helper";

type Props = {
  modal: ExtendedModalProps<{ id: undefined }, { id: number }>;
  handleModalClose: () => void;
};

/*
 * Sales Quotation Form Drawer
 */
export default function SalesQuotationForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } =
    useSalesQuotationForm({
      modal,
      closeModal: handleModalClose,
    });

  const isActive = useWatch({
    control: form.control,
    name: "is_active",
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
                    withAsterisk={isActive === 1}
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
                    withAsterisk={isActive === 1}
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
                    withAsterisk={isActive === 1}
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
                    withAsterisk={isActive === 1}
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
                    label="Name"
                    value={field.value ? field.value : ""}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    withAsterisk={isActive === 1}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="part_number"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Number"
                    value={field.value ? field.value : ""}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    withAsterisk={isActive === 1}
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
                  withAsterisk={isActive === 1}
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
                    withAsterisk={isActive === 1}
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
                    withAsterisk={isActive === 1}
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
                    withAsterisk={isActive === 1}
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
                    withAsterisk={isActive === 1}
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
                    withAsterisk={isActive === 1}
                    rows={5}
                  />
                )}
              />
            </SimpleGrid>
          </Fieldset>
          <Fieldset legend="Status Information" variant="filled" mt="md">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2 }}>
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
              <Controller
                control={form.control}
                name="lead_source"
                render={({ field, fieldState }) => (
                  <Select
                    label="Lead Source"
                    value={field.value ? field.value.toString() : "2"}
                    error={fieldState.error?.message}
                    withAsterisk
                    readOnly
                    data={[
                      { value: "1", label: "Website" },
                      { value: "2", label: "Call" },
                    ]}
                  />
                )}
              />
            </SimpleGrid>
            <Controller
              name="is_active"
              control={form.control}
              render={({ field, fieldState }) => (
                <Switch
                  label="Is Draft?"
                  checked={field.value === 0}
                  onChange={(e) => field.onChange(e.target.checked ? 0 : 1)}
                  error={fieldState.error?.message}
                  mt="md"
                />
              )}
            />
          </Fieldset>
          <Group gap="xs" mt="md">
            <Button
              type="submit"
              variant="filled"
              color={isActive === 1 ? "blue" : "cyan"}
              disabled={loading}
              loading={loading}
            >
              {isActive === 1 ? "Sale" : "Save as Draft"}
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
