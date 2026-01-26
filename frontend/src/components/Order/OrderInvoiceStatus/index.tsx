import { Badge } from "@mantine/core";

export type InvoiceStatus = 0 | 1 | 2;

interface OrderInvoiceStatusProps {
  invoice_status: InvoiceStatus;
}

const invoiceStatusMap = {
  0: { label: "Not Generated", color: "yellow" },
  1: { label: "Generated", color: "green" },
  2: { label: "Sent", color: "blue" },
};

function OrderInvoiceStatus({ invoice_status }: OrderInvoiceStatusProps) {
  const status = invoiceStatusMap[invoice_status] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderInvoiceStatus;
