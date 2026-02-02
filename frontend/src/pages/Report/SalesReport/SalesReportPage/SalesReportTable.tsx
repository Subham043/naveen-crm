import TableRowLoading from "@/components/TableRowLoading";
import type { SalesReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import Datetime from "@/components/Datetime";
import { memo } from "react";

type SalesReportTableProps = {
  salesReports: SalesReportType[];
  loading: boolean;
};

const SalesReportRow = memo(
  ({
    date,
    total_orders,
    total_sales,
    total_tax,
    total_profit,
  }: SalesReportType) => {
    return (
      <Table.Tr key={date}>
        <Table.Td>
          <Datetime value={date} format="DD MMM, YYYY" />
        </Table.Td>
        <Table.Td>{total_orders}</Table.Td>
        <Table.Td>{total_sales}</Table.Td>
        <Table.Td>{total_tax}</Table.Td>
        <Table.Td>{total_profit}</Table.Td>
      </Table.Tr>
    );
  },
);

function SalesReportTable({ loading, salesReports }: SalesReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>DATE</Table.Th>
            <Table.Th>TOTAL ORDER</Table.Th>
            <Table.Th>TOTAL SALES</Table.Th>
            <Table.Th>TOTAL TAX</Table.Th>
            <Table.Th>TOTAL PROFIT</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={5} />
          ) : salesReports.length > 0 ? (
            salesReports.map((item, index) => (
              <SalesReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={5} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SalesReportTable;
