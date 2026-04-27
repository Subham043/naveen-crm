import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { QuotationType } from "@/utils/types";

type Props = {
  sale_price: QuotationType["sale_price"];
  cost_price: QuotationType["cost_price"];
  shipping_cost: QuotationType["shipping_cost"];
  sales_tax: QuotationType["sales_tax"];
  gross_profit: QuotationType["gross_profit"];
};

function QuotationViewPriceInfo({
  sale_price,
  cost_price,
  shipping_cost,
  sales_tax,
  gross_profit,
}: Props) {
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
              {sale_price ? sale_price : 0.0}
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
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default QuotationViewPriceInfo;
