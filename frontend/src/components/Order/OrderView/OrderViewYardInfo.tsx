import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";
import OrderPaymentCardType, {
  type PaymentCardType,
} from "../OrderPaymentCardType";

type Props = {
  yards: OrderType["yards"];
  payment_card_type: OrderType["payment_card_type"];
  yard_located_info: OrderType["yard_located_info"];
};

function OrderViewYardInfo({
  yards,
  payment_card_type,
  yard_located_info,
}: Props) {
  if (payment_card_type === null && yards.length === 0) return null;
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Yard Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Box>
            <Text fw={600} c="blue">
              Yard Payment Details
            </Text>
            <Text size="sm" c="dimmed">
              <OrderPaymentCardType
                payment_card_type={payment_card_type as PaymentCardType}
              />
            </Text>
          </Box>
          {yard_located_info !== undefined && (
            <Box>
              <Text fw={600} c="blue">
                Yard Located
              </Text>
              <Text size="sm" c="dimmed">
                {yard_located_info}
              </Text>
            </Box>
          )}
          {yards.map((yard, index) => (
            <Box key={yard.id}>
              <Text fw={600} c="blue">
                Yard Detail {index + 1}
              </Text>
              <Text size="sm" c="dimmed">
                {yard.yard}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewYardInfo;
