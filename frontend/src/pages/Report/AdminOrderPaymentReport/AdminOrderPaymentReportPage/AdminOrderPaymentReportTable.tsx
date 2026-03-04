import TableRowLoading from "@/components/TableRowLoading";
import type { AdminOrderPaymentReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type AdminOrderPaymentReportTableProps = {
  adminOrderPaymentReports: AdminOrderPaymentReportType[];
  loading: boolean;
};

const AdminOrderPaymentReportRow = memo(
  ({
    period,
    total_orders,
    paid_orders,
    unpaid_orders,
    partial_paid_orders,
    payment_success_rate,
  }: AdminOrderPaymentReportType) => {
    return (
      <Table.Tr>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_orders}</Table.Td>
        <Table.Td>{paid_orders}</Table.Td>
        <Table.Td>{unpaid_orders}</Table.Td>
        <Table.Td>{partial_paid_orders}</Table.Td>
        <Table.Td>{payment_success_rate}%</Table.Td>
      </Table.Tr>
    );
  },
);

function AdminOrderPaymentReportTable({
  loading,
  adminOrderPaymentReports,
}: AdminOrderPaymentReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>PERIOD</Table.Th>
            <Table.Th>TOTAL ORDERS</Table.Th>
            <Table.Th>PAID ORDERS</Table.Th>
            <Table.Th>UNPAID ORDERS</Table.Th>
            <Table.Th>PARTIAL PAID ORDERS</Table.Th>
            <Table.Th>PAYMENT SUCCESS RATE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={6} />
          ) : adminOrderPaymentReports.length > 0 ? (
            adminOrderPaymentReports.map((item, index) => (
              <AdminOrderPaymentReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={6} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default AdminOrderPaymentReportTable;
