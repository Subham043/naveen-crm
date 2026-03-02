import { Badge } from "@mantine/core";

export type ShipmentStatus = 1 | 2;

interface OrderShipmentStatusProps {
  shipment_status: ShipmentStatus;
}

const shipmentStatusMap = {
  1: { label: "PO Pending", color: "yellow" },
  2: { label: "PO Sent", color: "green" },
};

function OrderShipmentStatus({ shipment_status }: OrderShipmentStatusProps) {
  const status = shipmentStatusMap[shipment_status] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderShipmentStatus;
