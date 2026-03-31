import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { QuotationType } from "@/utils/types";

type Props = {
  part_year: QuotationType["part_year"];
  part_model: QuotationType["part_model"];
  part_make: QuotationType["part_make"];
  part_name: QuotationType["part_name"];
  part_number: QuotationType["part_number"];
  part_warranty: QuotationType["part_warranty"];
  part_description: QuotationType["part_description"];
  quotation_sent: QuotationType["quotation_sent"];
};

function QuotationViewPartInfo({
  part_year,
  part_model,
  part_make,
  part_name,
  part_number,
  part_warranty,
  part_description,
  quotation_sent,
}: Props) {
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
              {part_year || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Make
            </Text>
            <Text size="sm" c="dimmed">
              {part_make || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Model
            </Text>
            <Text size="sm" c="dimmed">
              {part_model || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Part
            </Text>
            <Text size="sm" c="dimmed">
              {part_name || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Part#
            </Text>
            <Text size="sm" c="dimmed">
              {part_number || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Warranty (In Months)
            </Text>
            <Text size="sm" c="dimmed">
              {part_warranty || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Description
            </Text>
            <Text size="sm" c="dimmed">
              {part_description || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Quotation Sent
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_sent ? "Yes" : "No"}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default QuotationViewPartInfo;
