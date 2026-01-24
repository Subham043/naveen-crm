import {
  Box,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import SalesOrderStatus from "./SalesOrderStatus";
import type { SalesOrderType } from "@/utils/types";
import Datetime from "@/components/Datetime";

type Props = {
  is_active: SalesOrderType["is_active"];
  order_status: SalesOrderType["order_status"];
  approval_by_info: SalesOrderType["approval_by_info"];
  approval_at: SalesOrderType["approval_at"];
  name: SalesOrderType["name"];
  email: SalesOrderType["email"];
  phone_number: SalesOrderType["phone_number"];
  lead_source_info: SalesOrderType["lead_source_info"];
  part_name: SalesOrderType["part_name"];
  part_description: SalesOrderType["part_description"];
  billing_address: SalesOrderType["billing_address"];
  created_at: SalesOrderType["created_at"];
};

function SalesOrderCustomerInfo({
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
          <SalesOrderStatus
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

export default SalesOrderCustomerInfo;
