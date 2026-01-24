import { Controller, useWatch } from "react-hook-form";
import {
  Box,
  Button,
  Drawer,
  Group,
  Input,
  LoadingOverlay,
  Select,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useSalesOrderForm } from "./useSalesOrderForm";
import { PhoneInput } from "react-international-phone";

type Props = {
  modal: ExtendedModalProps<{ id: number }>;
  handleModalClose: () => void;
};

/*
 * Sales Order Form Drawer
 */
export default function SalesOrderForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } = useSalesOrderForm(
    {
      modal,
      closeModal: handleModalClose,
    },
  );

  const isActive = useWatch({
    control: form.control,
    name: "is_active",
  });

  return (
    <Drawer
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} Order`}
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      size="md"
    >
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={onSubmit}>
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
                mt="md"
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
                mt="md"
              >
                <PhoneInput
                  defaultCountry="in"
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
                mt="md"
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
                withAsterisk={isActive === 1}
                mt="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="part_description"
            render={({ field, fieldState }) => (
              <Textarea
                label="Part Description"
                value={field.value ? field.value : ""}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk={isActive === 1}
                rows={5}
                mt="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="lead_source"
            render={({ field, fieldState }) => (
              <Select
                label="Lead Source"
                value={field.value ? field.value.toString() : ""}
                onChange={(val) =>
                  field.onChange(val ? Number(val) : undefined)
                }
                error={fieldState.error?.message}
                withAsterisk
                data={[
                  { value: "2", label: "Lead" },
                  { value: "3", label: "Call" },
                ]}
                mt="md"
              />
            )}
          />
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
          <Group gap="xs" mt="md">
            <Button
              type="submit"
              variant="filled"
              color={isActive === 1 ? "blue" : "cyan"}
              disabled={loading}
              loading={loading}
            >
              {isActive === 1 ? "Submit for Approval" : "Save as Draft"}
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
