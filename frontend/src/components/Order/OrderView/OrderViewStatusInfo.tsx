import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";
import OrderStatus, { type OrderStatusType } from "../OrderStatus";

type Props = {
  order_status: OrderType["order_status"];
  tracking_details: OrderType["tracking_details"];
};

function OrderViewStatusInfo({ order_status, tracking_details }: Props) {
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Logistic & Status Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Box>
            <Text fw={600} c="blue">
              Order Status
            </Text>
            <OrderStatus order_status={order_status as OrderStatusType} />
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Tracking Details
            </Text>
            <Text size="sm" c="dimmed" style={{ whiteSpace: "pre-wrap" }}>
              {tracking_details || "N/A"}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewStatusInfo;
