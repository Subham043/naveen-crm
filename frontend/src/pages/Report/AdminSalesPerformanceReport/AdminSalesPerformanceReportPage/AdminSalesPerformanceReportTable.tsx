import TableRowLoading from "@/components/TableRowLoading";
import type { AdminSalesPerformanceReportType } from "@/utils/types";
import { Avatar, Box, Group, Table, Text } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type AdminSalesPerformanceReportTableProps = {
  adminSalesPerformanceReports: AdminSalesPerformanceReportType[];
  loading: boolean;
};

const AdminSalesPerformanceReportRow = memo(
  ({
    period,
    total_leads,
    total_revenue,
    total_profit,
    converted_leads,
    conversion_rate,
    sales_user_info,
  }: AdminSalesPerformanceReportType) => {
    return (
      <Table.Tr>
        <Table.Td>
          {sales_user_info ? (
            <Group gap={7} align="flex-start">
              <Avatar
                name={sales_user_info.name}
                color="initials"
                alt={sales_user_info.name}
                radius="xl"
                size={30}
              />
              <Box>
                <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                  {sales_user_info.name}
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
                  {sales_user_info.email}
                </Text>
                {sales_user_info.phone && (
                  <Text
                    fw={500}
                    fs="italic"
                    size="xs"
                    lh={1}
                    ml={3}
                    tt="lowercase"
                    mt={5}
                  >
                    {sales_user_info.phone}
                  </Text>
                )}
              </Box>
            </Group>
          ) : (
            "N/A"
          )}
        </Table.Td>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_leads}</Table.Td>
        <Table.Td>{total_revenue}</Table.Td>
        <Table.Td>{total_profit}</Table.Td>
        <Table.Td>{converted_leads}</Table.Td>
        <Table.Td>{conversion_rate}%</Table.Td>
      </Table.Tr>
    );
  },
);

function AdminSalesPerformanceReportTable({
  loading,
  adminSalesPerformanceReports,
}: AdminSalesPerformanceReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>AGENT</Table.Th>
            <Table.Th>PERIOD</Table.Th>
            <Table.Th>TOTAL LEADS</Table.Th>
            <Table.Th>TOTAL REVENUE</Table.Th>
            <Table.Th>TOTAL PROFIT</Table.Th>
            <Table.Th>CONVERTED LEADS</Table.Th>
            <Table.Th>CONVERSION RATE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={7} />
          ) : adminSalesPerformanceReports.length > 0 ? (
            adminSalesPerformanceReports.map((item, index) => (
              <AdminSalesPerformanceReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={7} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default AdminSalesPerformanceReportTable;
