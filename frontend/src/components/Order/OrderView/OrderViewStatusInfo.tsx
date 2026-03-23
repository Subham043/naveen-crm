import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";
import OrderInvoiceStatus, {
  type InvoiceStatus,
} from "@/components/Order/OrderInvoiceStatus";
import OrderPOStatus, { type POStatus } from "@/components/Order/OrderPOStatus";
import OrderStatus, { type OrderStatusType } from "../OrderStatus";

type Props = {
  invoice_status: OrderType["invoice_status"];
  po_status: OrderType["po_status"];
  order_status: OrderType["order_status"];
};

function OrderViewStatusInfo({
  invoice_status,
  po_status,
  order_status,
}: Props) {
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Status Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Box>
            <Text fw={600} c="blue">
              Invoice Status
            </Text>
            <OrderInvoiceStatus
              invoice_status={invoice_status as InvoiceStatus}
            />
          </Box>
          <Box>
            <Text fw={600} c="blue">
              PO Status
            </Text>
            <OrderPOStatus po_status={po_status as POStatus} />
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Order Status
            </Text>
            <OrderStatus order_status={order_status as OrderStatusType} />
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewStatusInfo;
