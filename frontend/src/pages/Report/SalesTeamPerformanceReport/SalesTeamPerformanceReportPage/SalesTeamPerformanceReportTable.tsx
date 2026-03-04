import TableRowLoading from "@/components/TableRowLoading";
import type { SalesTeamPerformanceReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type SalesTeamPerformanceReportTableProps = {
  salesTeamPerformanceReports: SalesTeamPerformanceReportType[];
  loading: boolean;
};

const SalesTeamPerformanceReportRow = memo(
  ({
    period,
    total_leads,
    converted_leads,
    conversion_rate,
  }: SalesTeamPerformanceReportType) => {
    return (
      <Table.Tr key={period}>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_leads}</Table.Td>
        <Table.Td>{converted_leads}</Table.Td>
        <Table.Td>{conversion_rate}</Table.Td>
      </Table.Tr>
    );
  },
);

function SalesTeamPerformanceReportTable({
  loading,
  salesTeamPerformanceReports,
}: SalesTeamPerformanceReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>PERIOD</Table.Th>
            <Table.Th>TOTAL LEADS</Table.Th>
            <Table.Th>CONVERTED LEADS</Table.Th>
            <Table.Th>CONVERSION RATE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={4} />
          ) : salesTeamPerformanceReports.length > 0 ? (
            salesTeamPerformanceReports.map((item, index) => (
              <SalesTeamPerformanceReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={4} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SalesTeamPerformanceReportTable;
