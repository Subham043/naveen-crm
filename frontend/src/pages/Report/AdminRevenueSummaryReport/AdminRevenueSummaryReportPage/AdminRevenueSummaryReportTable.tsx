import TableRowLoading from "@/components/TableRowLoading";
import type { AdminRevenueSummaryReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type AdminRevenueSummaryReportTableProps = {
  adminRevenueSummaryReports: AdminRevenueSummaryReportType[];
  loading: boolean;
};

const AdminRevenueSummaryReportRow = memo(
  ({
    period,
    total_revenue,
    total_cost,
    total_shipping,
    total_tax,
    total_profit,
    profit_margin_percent,
  }: AdminRevenueSummaryReportType) => {
    return (
      <Table.Tr key={period}>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_revenue}</Table.Td>
        <Table.Td>{total_cost}</Table.Td>
        <Table.Td>{total_shipping}</Table.Td>
        <Table.Td>{total_tax}</Table.Td>
        <Table.Td>{total_profit}</Table.Td>
        <Table.Td>{profit_margin_percent}%</Table.Td>
      </Table.Tr>
    );
  },
);

function AdminRevenueSummaryReportTable({
  loading,
  adminRevenueSummaryReports,
}: AdminRevenueSummaryReportTableProps) {
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
            <Table.Th>PROFIT MARGIN (%)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={7} />
          ) : adminRevenueSummaryReports.length > 0 ? (
            adminRevenueSummaryReports.map((item, index) => (
              <AdminRevenueSummaryReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={7} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default AdminRevenueSummaryReportTable;
