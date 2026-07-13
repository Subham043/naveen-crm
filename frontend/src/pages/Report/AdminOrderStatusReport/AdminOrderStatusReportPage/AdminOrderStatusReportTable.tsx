import TableRowLoading from "@/components/TableRowLoading";
import type { AdminOrderStatusReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type AdminOrderStatusReportTableProps = {
  adminOrderStatusReports: AdminOrderStatusReportType[];
  loading: boolean;
};

const AdminOrderStatusReportRow = memo(
  ({
    period,
    total_orders,
    pending_orders,
    relocate_orders,
    escalation_orders,
    invoice_sent_orders,
    tracking_sent_orders,
    refund_pending_from_yard_orders,
    refund_pending_to_customer_orders,
    cancelled_orders,
    po_sent_orders,
    part_shipped_orders,
    chargeback_orders,
    completed_orders,
  }: AdminOrderStatusReportType) => {
    return (
      <Table.Tr>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_orders}</Table.Td>
        <Table.Td>{pending_orders}</Table.Td>
        <Table.Td>{relocate_orders}</Table.Td>
        <Table.Td>{escalation_orders}</Table.Td>
        <Table.Td>{invoice_sent_orders}</Table.Td>
        <Table.Td>{tracking_sent_orders}</Table.Td>
        <Table.Td>{refund_pending_from_yard_orders}</Table.Td>
        <Table.Td>{refund_pending_to_customer_orders}</Table.Td>
        <Table.Td>{cancelled_orders}</Table.Td>
        <Table.Td>{po_sent_orders}</Table.Td>
        <Table.Td>{part_shipped_orders}</Table.Td>
        <Table.Td>{chargeback_orders}</Table.Td>
        <Table.Td>{completed_orders}</Table.Td>
      </Table.Tr>
    );
  },
);

function AdminOrderStatusReportTable({
  loading,
  adminOrderStatusReports,
}: AdminOrderStatusReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>PERIOD</Table.Th>
            <Table.Th>TOTAL ORDERS</Table.Th>
            <Table.Th>PENDING ORDERS</Table.Th>
            <Table.Th>RELOCATE ORDERS</Table.Th>
            <Table.Th>ESCALATION ORDERS</Table.Th>
            <Table.Th>INVOICE SENT ORDERS</Table.Th>
            <Table.Th>TRACKING SENT ORDERS</Table.Th>
            <Table.Th>REFUND PENDING FROM YARD ORDERS</Table.Th>
            <Table.Th>REFUND PENDING TO CUSTOMER ORDERS</Table.Th>
            <Table.Th>CANCELLED ORDERS</Table.Th>
            <Table.Th>PO SENT ORDERS</Table.Th>
            <Table.Th>PART SHIPPED ORDERS</Table.Th>
            <Table.Th>CHARGEBACK ORDERS</Table.Th>
            <Table.Th>COMPLETED ORDERS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={14} />
          ) : adminOrderStatusReports.length > 0 ? (
            adminOrderStatusReports.map((item, index) => (
              <AdminOrderStatusReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={14} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default AdminOrderStatusReportTable;
