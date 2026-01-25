import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";

type Props = {
  tracking_details: OrderType["tracking_details"];
  invoice_status_info: OrderType["invoice_status_info"];
  shipment_status_info: OrderType["shipment_status_info"];
};

function OrderLogisticInfo({
  tracking_details,
  invoice_status_info,
  shipment_status_info,
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
            <Text size="sm" c="dimmed">
              {invoice_status_info || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Shipping Status
            </Text>
            <Text size="sm" c="dimmed">
              {shipment_status_info || "N/A"}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderLogisticInfo;
