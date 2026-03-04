import TableRowLoading from "@/components/TableRowLoading";
import type { SalesTeamApprovalTurnAroundReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type SalesTeamApprovalTurnAroundReportTableProps = {
  salesTeamApprovalTurnAround: SalesTeamApprovalTurnAroundReportType[];
  loading: boolean;
};

const SalesTeamApprovalTurnAroundReportRow = memo(
  ({ date, avg_approval_hours }: SalesTeamApprovalTurnAroundReportType) => {
    return (
      <Table.Tr key={date}>
        <Table.Td>{date}</Table.Td>
        <Table.Td>{avg_approval_hours}</Table.Td>
      </Table.Tr>
    );
  },
);

function SalesTeamApprovalTurnAroundReportTable({
  loading,
  salesTeamApprovalTurnAround,
}: SalesTeamApprovalTurnAroundReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>DATE</Table.Th>
            <Table.Th>AVG APPROVAL HOURS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={2} />
          ) : salesTeamApprovalTurnAround.length > 0 ? (
            salesTeamApprovalTurnAround.map((item, index) => (
              <SalesTeamApprovalTurnAroundReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={2} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SalesTeamApprovalTurnAroundReportTable;
