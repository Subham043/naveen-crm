import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";

type Props = {
  quotation_info: OrderType["quotation_info"];
};

function OrderViewPartInfo({ quotation_info }: Props) {
  if (!quotation_info) return null;
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Part Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Box>
            <Text fw={600} c="blue">
              Year
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.part_year || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Make
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.part_make || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Model
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.part_model || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Name
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.part_name || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Number
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.part_number || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Description
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.part_description || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Quotation Sent
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.quotation_sent ? "Yes" : "No"}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewPartInfo;
