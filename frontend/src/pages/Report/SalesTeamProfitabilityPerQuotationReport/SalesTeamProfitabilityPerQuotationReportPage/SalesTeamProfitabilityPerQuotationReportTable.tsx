import TableRowLoading from "@/components/TableRowLoading";
import type { SalesTeamProfitabilityPerQuotationReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type SalesTeamProfitabilityPerQuotationReportTableProps = {
  salesTeamProfitabilityPerQuotationReports: SalesTeamProfitabilityPerQuotationReportType[];
  loading: boolean;
};

const SalesTeamProfitabilityPerQuotationReportRow = memo(
  ({
    id,
    sale_price,
    cost_price,
    shipping_cost,
    tax,
    gross_profit,
  }: SalesTeamProfitabilityPerQuotationReportType) => {
    return (
      <Table.Tr key={id}>
        <Table.Td>{id}</Table.Td>
        <Table.Td>{sale_price}</Table.Td>
        <Table.Td>{cost_price}</Table.Td>
        <Table.Td>{shipping_cost}</Table.Td>
        <Table.Td>{tax}</Table.Td>
        <Table.Td>{gross_profit}</Table.Td>
      </Table.Tr>
    );
  },
);

function SalesTeamProfitabilityPerQuotationReportTable({
  loading,
  salesTeamProfitabilityPerQuotationReports,
}: SalesTeamProfitabilityPerQuotationReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>QUOTATION ID</Table.Th>
            <Table.Th>SALE PRICE</Table.Th>
            <Table.Th>COST PRICE</Table.Th>
            <Table.Th>SHIPPING COST</Table.Th>
            <Table.Th>SALES TAX</Table.Th>
            <Table.Th>GROSS PROFIT</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={6} />
          ) : salesTeamProfitabilityPerQuotationReports.length > 0 ? (
            salesTeamProfitabilityPerQuotationReports.map((item, index) => (
              <SalesTeamProfitabilityPerQuotationReportRow
                key={index}
                {...item}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={6} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SalesTeamProfitabilityPerQuotationReportTable;
