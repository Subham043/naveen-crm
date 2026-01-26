import { Badge } from "@mantine/core";

export type ShipmentStatus = 1 | 2 | 3 | 4 | 5;

interface OrderShipmentStatusProps {
  shipment_status: ShipmentStatus;
}

const shipmentStatusMap = {
  1: { label: "Processing", color: "yellow" },
  2: { label: "Shipped", color: "green" },
  3: { label: "Delivered", color: "blue" },
  4: { label: "Closed", color: "gray" },
  5: { label: "Cancelled", color: "red" },
};

function OrderShipmentStatus({ shipment_status }: OrderShipmentStatusProps) {
  const status = shipmentStatusMap[shipment_status] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderShipmentStatus;
