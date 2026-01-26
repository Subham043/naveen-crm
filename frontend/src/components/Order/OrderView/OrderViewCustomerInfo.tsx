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
import OrderApprovalStatus from "@/components/Order/OrderApprovalStatus";

type Props = {
  is_active: OrderType["is_active"];
  order_status: OrderType["order_status"];
  approval_by_info: OrderType["approval_by_info"];
  approval_at: OrderType["approval_at"];
  name: OrderType["name"];
  email: OrderType["email"];
  phone_number: OrderType["phone_number"];
  lead_source_info: OrderType["lead_source_info"];
  part_name: OrderType["part_name"];
  part_description: OrderType["part_description"];
  billing_address: OrderType["billing_address"];
  created_at: OrderType["created_at"];
};

function OrderViewCustomerInfo({
  is_active,
  order_status,
  approval_by_info,
  approval_at,
  name,
  email,
  phone_number,
  lead_source_info,
  part_name,
  part_description,
  billing_address,
  created_at,
}: Props) {
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={5}>Customer Info</Title>
          <OrderApprovalStatus
            is_active={is_active}
            order_status={order_status}
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
              Part Name
            </Text>
            <Text size="sm" c="dimmed">
              {part_name || "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fw={600} c="blue">
              Part Description
            </Text>
            <Text size="sm" c="dimmed">
              {part_description || "N/A"}
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
