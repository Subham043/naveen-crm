import TableRowLoading from "@/components/TableRowLoading";
import type { AdminApprovalTurnAroundReportType } from "@/utils/types";
import { Avatar, Box, Group, Table, Text } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type AdminApprovalTurnAroundReportTableProps = {
  adminApprovalTurnAroundReports: AdminApprovalTurnAroundReportType[];
  loading: boolean;
};

const AdminApprovalTurnAroundReportRow = memo(
  ({
    avg_approval_hours,
    sales_user_info,
  }: AdminApprovalTurnAroundReportType) => {
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
        <Table.Td>{avg_approval_hours}</Table.Td>
      </Table.Tr>
    );
  },
);

function AdminApprovalTurnAroundReportTable({
  loading,
  adminApprovalTurnAroundReports,
}: AdminApprovalTurnAroundReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>AGENT</Table.Th>
            <Table.Th>AVG APPROVAL HOURS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={2} />
          ) : adminApprovalTurnAroundReports.length > 0 ? (
            adminApprovalTurnAroundReports.map((item, index) => (
              <AdminApprovalTurnAroundReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={2} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default AdminApprovalTurnAroundReportTable;
