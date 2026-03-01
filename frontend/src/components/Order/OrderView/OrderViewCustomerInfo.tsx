import {
  Box,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import type { OrderType } from "@/utils/types";
import Datetime from "@/components/Datetime";
import QuotationApprovalStatus from "@/components/Quotation/QuotationApprovalStatus";

type Props = {
  quotation_info: OrderType["quotation_info"];
  created_at: OrderType["created_at"];
};

function OrderViewCustomerInfo({ quotation_info, created_at }: Props) {
  if (!quotation_info) return null;
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={5}>Customer Info</Title>
          <QuotationApprovalStatus
            is_active={quotation_info.is_active}
            quotation_status={quotation_info.quotation_status}
            approval_by_info={quotation_info.approval_by_info}
            approval_at={quotation_info.approval_at}
          />
        </Group>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Box>
            <Text fw={600} c="blue">
              Name
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.name}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Email
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.email}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Phone
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.phone_number || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Lead Source
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.lead_source_info}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Billing Address
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.billing_address || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Shipping Address
            </Text>
            <Text size="sm" c="dimmed">
              {quotation_info.shipping_address || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Created At
            </Text>
            <Text size="sm" c="dimmed">
              <Datetime value={created_at} />
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewCustomerInfo;
