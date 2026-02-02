import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";
import OrderPaymentStatus, {
  type PaymentStatus,
} from "@/components/Order/OrderPaymentStatus";

type Props = {
  total_price: OrderType["total_price"];
  cost_price: OrderType["cost_price"];
  shipping_cost: OrderType["shipping_cost"];
  sales_tax: OrderType["sales_tax"];
  gross_profit: OrderType["gross_profit"];
  payment_status: OrderType["payment_status"];
};

function OrderViewPaymentInfo({
  total_price,
  cost_price,
  shipping_cost,
  sales_tax,
  gross_profit,
  payment_status,
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
              Total Price
            </Text>
            <Text size="sm" c="dimmed">
              {total_price ? total_price : 0.0}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Cost Price
            </Text>
            <Text size="sm" c="dimmed">
              {cost_price ? cost_price : 0.0}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Shipping Cost
            </Text>
            <Text size="sm" c="dimmed">
              {shipping_cost ? shipping_cost : 0.0}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Sales Tax
            </Text>
            <Text size="sm" c="dimmed">
              {sales_tax ? sales_tax : 0.0}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Gross Profit
            </Text>
            <Text size="sm" c="dimmed">
              {gross_profit ? gross_profit : 0.0}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Payment Status
            </Text>
            <OrderPaymentStatus
              payment_status={payment_status as PaymentStatus}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewPaymentInfo;
