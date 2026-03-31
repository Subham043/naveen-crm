import { Badge } from "@mantine/core";

export type OrderStatusType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface OrderStatusProps {
  order_status: OrderStatusType;
}

const orderStatusMap = {
  0: { label: "Pending", color: "yellow" },
  1: { label: "Escalation", color: "orange" },
  2: { label: "Cancelled", color: "red" },
  3: { label: "Pending For Refund", color: "orange" },
  4: { label: "Refunded", color: "indigo" },
  5: { label: "Part Shipped", color: "cyan" },
  6: { label: "Completed", color: "green" },
  7: { label: "ChargeBack", color: "red" },
};

function OrderStatus({ order_status }: OrderStatusProps) {
  const status = orderStatusMap[order_status] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderStatus;
