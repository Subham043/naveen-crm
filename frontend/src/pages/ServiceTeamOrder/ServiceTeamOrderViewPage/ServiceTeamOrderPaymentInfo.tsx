import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { ServiceTeamOrderType } from "@/utils/types";

type Props = {
  total_price: ServiceTeamOrderType["total_price"];
  cost_price: ServiceTeamOrderType["cost_price"];
  shipping_cost: ServiceTeamOrderType["shipping_cost"];
  sales_tax: ServiceTeamOrderType["sales_tax"];
  gross_profit: ServiceTeamOrderType["gross_profit"];
  payment_status_info: ServiceTeamOrderType["payment_status_info"];
};

function ServiceTeamOrderPaymentInfo({
  total_price,
  cost_price,
  shipping_cost,
  sales_tax,
  gross_profit,
  payment_status_info,
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
              {total_price || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Cost Price
            </Text>
            <Text size="sm" c="dimmed">
              {cost_price || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Shipping Cost
            </Text>
            <Text size="sm" c="dimmed">
              {shipping_cost || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              ServiceTeam Tax
            </Text>
            <Text size="sm" c="dimmed">
              {sales_tax || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Gross Profit
            </Text>
            <Text size="sm" c="dimmed">
              {gross_profit || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Payment Status
            </Text>
            <Text size="sm" c="dimmed">
              {payment_status_info}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default ServiceTeamOrderPaymentInfo;
