import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";
import OrderInvoiceStatus, {
  type InvoiceStatus,
} from "@/components/Order/OrderInvoiceStatus";
import OrderShipmentStatus, {
  type ShipmentStatus,
} from "@/components/Order/OrderShipmentStatus";

type Props = {
  tracking_details: OrderType["tracking_details"];
  invoice_status: OrderType["invoice_status"];
  shipment_status: OrderType["shipment_status"];
};

function OrderViewLogisticInfo({
  tracking_details,
  invoice_status,
  shipment_status,
}: Props) {
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Logistic Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Box>
            <Text fw={600} c="blue">
              Tracking Details
            </Text>
            <Text size="sm" c="dimmed">
              {tracking_details || "N/A"}
            </Text>
          </Box>
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
              Shipping Status
            </Text>
            <OrderShipmentStatus
              shipment_status={shipment_status as ShipmentStatus}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewLogisticInfo;
