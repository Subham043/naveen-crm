import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  Drawer,
  Group,
  LoadingOverlay,
  Select,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useSalesOrderForm } from "./useSalesOrderForm";

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
            name="country_code"
            render={({ field, fieldState }) => (
              <TextInput
                label="Country Code"
                value={field.value ? field.value : ""}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                mt="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <TextInput
                label="Phone"
                value={field.value ? field.value : ""}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                mt="md"
              />
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
                withAsterisk
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
                withAsterisk
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
                withAsterisk
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
                checked={field.value === 1 ? true : false}
                onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                error={fieldState.error?.message}
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
