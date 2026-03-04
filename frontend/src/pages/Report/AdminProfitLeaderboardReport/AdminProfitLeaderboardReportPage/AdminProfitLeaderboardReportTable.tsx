import TableRowLoading from "@/components/TableRowLoading";
import type { AdminProfitLeaderboardReportType } from "@/utils/types";
import { Avatar, Box, Group, Table, Text } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type AdminProfitLeaderboardReportTableProps = {
  adminProfitLeaderboardReports: AdminProfitLeaderboardReportType[];
  loading: boolean;
};

const AdminProfitLeaderboardReportRow = memo(
  ({
    total_revenue,
    total_profit,
    sales_user_info,
  }: AdminProfitLeaderboardReportType) => {
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
        <Table.Td>{total_revenue}</Table.Td>
        <Table.Td>{total_profit}</Table.Td>
      </Table.Tr>
    );
  },
);

function AdminProfitLeaderboardReportTable({
  loading,
  adminProfitLeaderboardReports,
}: AdminProfitLeaderboardReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>AGENT</Table.Th>
            <Table.Th>TOTAL REVENUE</Table.Th>
            <Table.Th>TOTAL PROFIT</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={3} />
          ) : adminProfitLeaderboardReports.length > 0 ? (
            adminProfitLeaderboardReports.map((item, index) => (
              <AdminProfitLeaderboardReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={3} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default AdminProfitLeaderboardReportTable;
