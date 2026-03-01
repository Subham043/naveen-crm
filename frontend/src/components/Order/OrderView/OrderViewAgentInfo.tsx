import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";
import Datetime from "@/components/Datetime";

type Props = {
  quotation_info: OrderType["quotation_info"];
};

function OrderViewAgentInfo({ quotation_info }: Props) {
  if (!quotation_info || !quotation_info.sales_user_info) return null;
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Agent Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Box>
            <Text fw={600} c="blue">
              Name
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.sales_user_info.name}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Email
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.sales_user_info.email}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Phone
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.sales_user_info.phone || "N/A"}
            </Text>
          </Box>
          {/* <Box>
            <Text fw={600} c="blue">
              Order Created By Agent
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.is_created_by_agent ? "Yes" : "No, Assigned By System"}
            </Text>
          </Box> */}
          {!quotation_info.is_created_by_agent &&
            quotation_info.assigned_at && (
              <Box>
                <Text fw={600} c="blue">
                  Quotation Assigned At
                </Text>
                <Text size="sm" c="dimmed">
                  <Datetime value={quotation_info.assigned_at} />
                </Text>
              </Box>
            )}
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewAgentInfo;
