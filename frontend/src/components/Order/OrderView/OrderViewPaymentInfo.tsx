import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";
import OrderPaymentStatus, {
  type PaymentStatus,
} from "@/components/Order/OrderPaymentStatus";

type Props = {
  payment_status: OrderType["payment_status"];
  payment_card_type_info: OrderType["payment_card_type_info"];
  payment_gateway_info: OrderType["payment_gateway_info"];
  transaction_id: OrderType["transaction_id"];
};

function OrderViewPaymentInfo({
  payment_status,
  payment_card_type_info,
  payment_gateway_info,
  transaction_id,
}: Props) {
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Payment Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Box>
            <Text fw={600} c="blue">
              Payment Status
            </Text>
            <OrderPaymentStatus
              payment_status={payment_status as PaymentStatus}
            />
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Payment Card Type
            </Text>
            <Text size="sm" c="dimmed">
              {payment_card_type_info || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Payment Gateway
            </Text>
            <Text size="sm" c="dimmed">
              {payment_gateway_info || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Transaction ID
            </Text>
            <Text size="sm" c="dimmed">
              {transaction_id || "N/A"}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewPaymentInfo;
