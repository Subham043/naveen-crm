import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";
import type { TrackingStatus } from "../OrderTrackingStatus";
import OrderTrackingStatus from "../OrderTrackingStatus";

type Props = {
  tracking_details: OrderType["tracking_details"];
  tracking_status: OrderType["tracking_status"];
};

function OrderViewLogisticInfo({ tracking_details, tracking_status }: Props) {
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
              Tracking Status
            </Text>
            <OrderTrackingStatus
              tracking_status={tracking_status as TrackingStatus}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewLogisticInfo;
