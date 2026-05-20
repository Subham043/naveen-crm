import { Badge } from "@mantine/core";

export type OrderStatusType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface OrderStatusProps {
  order_status: OrderStatusType;
}

const orderStatusMap = {
  0: { label: "Pending", color: "yellow" },
  1: { label: "Relocate", color: "orange" },
  2: { label: "Escalation", color: "red" },
  3: { label: "Invoice Sent", color: "yellow" },
  4: { label: "Tracking Sent", color: "cyan" },
  5: { label: "Refund Pending From Yard", color: "pink" },
  6: { label: "Refund Pending To Customer", color: "pink" },
  7: { label: "Cancelled", color: "red" },
  8: { label: "Part Shipped", color: "indigo" },
  9: { label: "PO Sent", color: "purple" },
  10: { label: "ChargeBack", color: "red" },
  11: { label: "Completed", color: "green" },
};

function OrderStatus({ order_status }: OrderStatusProps) {
  const status = orderStatusMap[order_status] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderStatus;
