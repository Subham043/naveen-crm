import TableRowLoading from "@/components/TableRowLoading";
import type { AdminServicePerformanceReportType } from "@/utils/types";
import { Avatar, Box, Group, Table, Text } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type AdminServicePerformanceReportTableProps = {
  adminServicePerformanceReports: AdminServicePerformanceReportType[];
  loading: boolean;
};

const AdminServicePerformanceReportRow = memo(
  ({
    period,
    total_comments,
    orders_handled,
    performance_percentage,
    user_info,
  }: AdminServicePerformanceReportType) => {
    return (
      <Table.Tr>
        <Table.Td>
          {user_info ? (
            <Group gap={7} align="flex-start">
              <Avatar
                name={user_info.name}
                color="initials"
                alt={user_info.name}
                radius="xl"
                size={30}
              />
              <Box>
                <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                  {user_info.name}
                </Text>
                <Text
                  fw={500}
                  fs="italic"
                  size="xs"
                  lh={1}
                  ml={3}
                  tt="lowercase"
                  mt={5}
                >
                  {user_info.email}
                </Text>
                {user_info.phone && (
                  <Text
                    fw={500}
                    fs="italic"
                    size="xs"
                    lh={1}
                    ml={3}
                    tt="lowercase"
                    mt={5}
                  >
                    {user_info.phone}
                  </Text>
                )}
              </Box>
            </Group>
          ) : (
            "N/A"
          )}
        </Table.Td>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_comments}</Table.Td>
        <Table.Td>{orders_handled}</Table.Td>
        <Table.Td>{performance_percentage}%</Table.Td>
      </Table.Tr>
    );
  },
);

function AdminServicePerformanceReportTable({
  loading,
  adminServicePerformanceReports,
}: AdminServicePerformanceReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>AGENT</Table.Th>
            <Table.Th>PERIOD</Table.Th>
            <Table.Th>TOTAL COMMENTS</Table.Th>
            <Table.Th>ORDERS HANDLED</Table.Th>
            <Table.Th>PERFORMANCE PERCENTAGE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={5} />
          ) : adminServicePerformanceReports.length > 0 ? (
            adminServicePerformanceReports.map((item, index) => (
              <AdminServicePerformanceReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={5} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default AdminServicePerformanceReportTable;
