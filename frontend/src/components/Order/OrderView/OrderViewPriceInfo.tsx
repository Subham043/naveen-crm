import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";

type Props = {
  quotation_info: OrderType["quotation_info"];
};

function OrderViewPriceInfo({ quotation_info }: Props) {
  if (!quotation_info) return null;
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Price Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Box>
            <Text fw={600} c="blue">
              Sale Price
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.sale_price ? quotation_info.sale_price : 0.0}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Cost Price
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.cost_price ? quotation_info.cost_price : 0.0}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Shipping Cost
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.shipping_cost
                ? quotation_info.shipping_cost
                : 0.0}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Sales Tax
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.sales_tax ? quotation_info.sales_tax : 0.0}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Gross Profit
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.gross_profit ? quotation_info.gross_profit : 0.0}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewPriceInfo;
