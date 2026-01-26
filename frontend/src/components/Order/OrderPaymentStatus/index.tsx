import { Badge } from "@mantine/core";

export type PaymentStatus = 0 | 1 | 2;

interface OrderPaymentStatusProps {
  payment_status: PaymentStatus;
}

const paymentStatusMap = {
  0: { label: "Pending", color: "yellow" },
  1: { label: "Paid", color: "green" },
  2: { label: "Partially Paid", color: "blue" },
};

function OrderPaymentStatus({ payment_status }: OrderPaymentStatusProps) {
  const status = paymentStatusMap[payment_status] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderPaymentStatus;
