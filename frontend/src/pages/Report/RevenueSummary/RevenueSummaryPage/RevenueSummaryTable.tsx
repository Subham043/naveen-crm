import TableRowLoading from "@/components/TableRowLoading";
import type { RevenueSummaryReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type RevenueSummaryTableProps = {
  revenueSummary: RevenueSummaryReportType[];
  loading: boolean;
};

const RevenueSummaryRow = memo(
  ({
    period,
    total_revenue,
    total_cost,
    total_shipping,
    total_tax,
    total_profit,
  }: RevenueSummaryReportType) => {
    return (
      <Table.Tr key={period}>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_revenue}</Table.Td>
        <Table.Td>{total_cost}</Table.Td>
        <Table.Td>{total_shipping}</Table.Td>
        <Table.Td>{total_tax}</Table.Td>
        <Table.Td>{total_profit}</Table.Td>
      </Table.Tr>
    );
  },
);

function RevenueSummaryTable({
  loading,
  revenueSummary,
}: RevenueSummaryTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>PERIOD</Table.Th>
            <Table.Th>TOTAL REVENUE</Table.Th>
            <Table.Th>TOTAL COST</Table.Th>
            <Table.Th>TOTAL SHIPPING</Table.Th>
            <Table.Th>TOTAL TAX</Table.Th>
            <Table.Th>TOTAL PROFIT</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={6} />
          ) : revenueSummary.length > 0 ? (
            revenueSummary.map((item, index) => (
              <RevenueSummaryRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={6} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default RevenueSummaryTable;
