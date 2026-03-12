import { FormProvider } from "react-hook-form";
import { Box, Button, Drawer, Group, LoadingOverlay } from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useOrderForm } from "./useOrderForm";
import CustomerFormSection from "./sections/CustomerFormSection";
import PartFormSection from "./sections/PartFormSection";
import PriceFormSection from "./sections/PriceFormSection";
import AddressFormSection from "./sections/AddressFormSection";
import LogisticFormSection from "./sections/LogisticFormSection";
import PaymentFormSection from "./sections/PaymentFormSection";
import StatusFormSection from "./sections/StatusFormSection";
import YardFormSection from "./sections/YardFormSection";
import type { OrderUpdateFormValuesType } from "@/utils/data/schema/order";

type Props = {
  modal: ExtendedModalProps<{ id: undefined }, { id: number }>;
  handleModalClose: () => void;
};

/*
 * Order Form Drawer
 */
export default function OrderForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } = useOrderForm({
    modal,
    closeModal: handleModalClose,
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
        <FormProvider<OrderUpdateFormValuesType> {...form}>
          <form onSubmit={onSubmit}>
            <CustomerFormSection />
            <PartFormSection />
            <PriceFormSection />
            <AddressFormSection />
            <LogisticFormSection />
            <PaymentFormSection />
            <StatusFormSection />
            <YardFormSection />
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
        </FormProvider>
      </Box>
    </Drawer>
  );
}
