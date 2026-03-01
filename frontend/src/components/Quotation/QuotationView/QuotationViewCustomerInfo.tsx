import {
  Box,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import type { QuotationType } from "@/utils/types";
import Datetime from "@/components/Datetime";
import QuotationApprovalStatus from "@/components/Quotation/QuotationApprovalStatus";

type Props = {
  is_active: QuotationType["is_active"];
  quotation_status: QuotationType["quotation_status"];
  approval_by_info: QuotationType["approval_by_info"];
  approval_at: QuotationType["approval_at"];
  name: QuotationType["name"];
  email: QuotationType["email"];
  phone_number: QuotationType["phone_number"];
  lead_source_info: QuotationType["lead_source_info"];
  billing_address: QuotationType["billing_address"];
  shipping_address: QuotationType["shipping_address"];
  created_at: QuotationType["created_at"];
};

function QuotationViewCustomerInfo({
  is_active,
  quotation_status,
  approval_by_info,
  approval_at,
  name,
  email,
  phone_number,
  lead_source_info,
  billing_address,
  shipping_address,
  created_at,
}: Props) {
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={5}>Customer Info</Title>
          <QuotationApprovalStatus
            is_active={is_active}
            quotation_status={quotation_status}
            approval_by_info={approval_by_info}
            approval_at={approval_at}
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
              {name}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Email
            </Text>
            <Text size="sm" c="dimmed">
              {email}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Phone
            </Text>
            <Text size="sm" c="dimmed">
              {phone_number || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Lead Source
            </Text>
            <Text size="sm" c="dimmed">
              {lead_source_info}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Billing Address
            </Text>
            <Text size="sm" c="dimmed">
              {billing_address || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Shipping Address
            </Text>
            <Text size="sm" c="dimmed">
              {shipping_address || "N/A"}
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

export default QuotationViewCustomerInfo;
