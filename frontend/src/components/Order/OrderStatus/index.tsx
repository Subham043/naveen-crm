import { Badge } from "@mantine/core";

export type OrderStatusType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface OrderStatusProps {
  order_status: OrderStatusType;
}

const orderStatusMap = {
  0: { label: "Pending", color: "yellow" },
  1: { label: "Escalation", color: "orange" },
  2: { label: "Cancelled", color: "red" },
  3: { label: "Relocate Po Sent", color: "blue" },
  4: { label: "Pending For Refund", color: "orange" },
  5: { label: "Refunded", color: "indigo" },
  6: { label: "Pending Part Shipped", color: "cyan" },
  7: { label: "Completed", color: "green" },
  8: { label: "ChargeBack", color: "red" },
  9: { label: "Yard Relocate", color: "teal" },
};

function OrderStatus({ order_status }: OrderStatusProps) {
  const status = orderStatusMap[order_status] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderStatus;
