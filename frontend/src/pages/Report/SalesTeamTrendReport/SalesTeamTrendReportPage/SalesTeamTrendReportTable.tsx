import TableRowLoading from "@/components/TableRowLoading";
import type { SalesTeamTrendReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type SalesTeamTrendReportTableProps = {
  salesTeamTrendReports: SalesTeamTrendReportType[];
  loading: boolean;
};

const SalesTeamTrendReportRow = memo(
  ({ period, total_sales, total_revenue }: SalesTeamTrendReportType) => {
    return (
      <Table.Tr key={period}>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_sales}</Table.Td>
        <Table.Td>{total_revenue}</Table.Td>
      </Table.Tr>
    );
  },
);

function SalesTeamTrendReportTable({
  loading,
  salesTeamTrendReports,
}: SalesTeamTrendReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>PERIOD</Table.Th>
            <Table.Th>TOTAL SALES</Table.Th>
            <Table.Th>TOTAL REVENUE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={3} />
          ) : salesTeamTrendReports.length > 0 ? (
            salesTeamTrendReports.map((item, index) => (
              <SalesTeamTrendReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={3} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SalesTeamTrendReportTable;
