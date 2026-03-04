import TableRowLoading from "@/components/TableRowLoading";
import type { SalesTeamLeadSourcePerformanceReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type SalesTeamLeadSourcePerformanceReportTableProps = {
  salesTeamLeadSourcePerformance: SalesTeamLeadSourcePerformanceReportType[];
  loading: boolean;
};

const SalesTeamLeadSourcePerformanceReportRow = memo(
  ({
    lead_source,
    total_leads,
    approved,
    total_revenue,
  }: SalesTeamLeadSourcePerformanceReportType) => {
    return (
      <Table.Tr key={lead_source}>
        <Table.Td>{lead_source}</Table.Td>
        <Table.Td>{total_leads}</Table.Td>
        <Table.Td>{approved}</Table.Td>
        <Table.Td>{total_revenue}</Table.Td>
      </Table.Tr>
    );
  },
);

function SalesTeamLeadSourcePerformanceReportTable({
  loading,
  salesTeamLeadSourcePerformance,
}: SalesTeamLeadSourcePerformanceReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>LEAD SOURCE</Table.Th>
            <Table.Th>TOTAL LEADS</Table.Th>
            <Table.Th>APPROVED</Table.Th>
            <Table.Th>TOTAL REVENUE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={4} />
          ) : salesTeamLeadSourcePerformance.length > 0 ? (
            salesTeamLeadSourcePerformance.map((item, index) => (
              <SalesTeamLeadSourcePerformanceReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={4} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SalesTeamLeadSourcePerformanceReportTable;
