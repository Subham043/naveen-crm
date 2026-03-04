import TableRowLoading from "@/components/TableRowLoading";
import type { SalesTeamPipelineStatusReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type SalesTeamPipelineStatusReportTableProps = {
  salesTeamPipelineStatusReports: SalesTeamPipelineStatusReportType[];
  loading: boolean;
};

const SalesTeamPipelineStatusReportRow = memo(
  ({
    quotation_status,
    total_sales,
    total_revenue,
  }: SalesTeamPipelineStatusReportType) => {
    return (
      <Table.Tr key={quotation_status}>
        <Table.Td>{quotation_status}</Table.Td>
        <Table.Td>{total_sales}</Table.Td>
        <Table.Td>{total_revenue}</Table.Td>
      </Table.Tr>
    );
  },
);

function SalesTeamPipelineStatusReportTable({
  loading,
  salesTeamPipelineStatusReports,
}: SalesTeamPipelineStatusReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>STATUS</Table.Th>
            <Table.Th>TOTAL SALES</Table.Th>
            <Table.Th>TOTAL REVENUE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={3} />
          ) : salesTeamPipelineStatusReports.length > 0 ? (
            salesTeamPipelineStatusReports.map((item, index) => (
              <SalesTeamPipelineStatusReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={3} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SalesTeamPipelineStatusReportTable;
