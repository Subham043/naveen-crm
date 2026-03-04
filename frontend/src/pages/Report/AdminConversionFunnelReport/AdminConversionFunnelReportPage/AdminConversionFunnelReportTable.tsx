import TableRowLoading from "@/components/TableRowLoading";
import type { AdminConversionFunnelReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type AdminConversionFunnelReportTableProps = {
  adminConversionFunnelReports: AdminConversionFunnelReportType[];
  loading: boolean;
};

const AdminConversionFunnelReportRow = memo(
  ({
    period,
    total_quotations,
    approved_quotations,
    rejected_quotations,
  }: AdminConversionFunnelReportType) => {
    return (
      <Table.Tr key={period}>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_quotations}</Table.Td>
        <Table.Td>{approved_quotations}</Table.Td>
        <Table.Td>{rejected_quotations}</Table.Td>
      </Table.Tr>
    );
  },
);

function AdminConversionFunnelReportTable({
  loading,
  adminConversionFunnelReports,
}: AdminConversionFunnelReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>PERIOD</Table.Th>
            <Table.Th>TOTAL QUOTATION</Table.Th>
            <Table.Th>APPROVED QUOTATION</Table.Th>
            <Table.Th>REJECTED QUOTATION</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={4} />
          ) : adminConversionFunnelReports.length > 0 ? (
            adminConversionFunnelReports.map((item, index) => (
              <AdminConversionFunnelReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={4} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default AdminConversionFunnelReportTable;
