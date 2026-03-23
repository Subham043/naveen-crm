import { Badge } from "@mantine/core";

export type POStatus = 1 | 2;

interface OrderPOStatusProps {
  po_status: POStatus;
}

const poStatusMap = {
  1: { label: "PO Pending", color: "yellow" },
  2: { label: "PO Sent", color: "green" },
};

function OrderPOStatus({ po_status }: OrderPOStatusProps) {
  const status = poStatusMap[po_status] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderPOStatus;
