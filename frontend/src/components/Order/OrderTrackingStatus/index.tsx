import { Badge } from "@mantine/core";

export type TrackingStatus = 0 | 1;

interface OrderTrackingStatusProps {
  tracking_status: TrackingStatus;
}

const trackingStatusMap = {
  0: { label: "Pending", color: "yellow" },
  1: { label: "Sent", color: "green" },
};

function OrderTrackingStatus({ tracking_status }: OrderTrackingStatusProps) {
  const status = trackingStatusMap[tracking_status] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderTrackingStatus;
