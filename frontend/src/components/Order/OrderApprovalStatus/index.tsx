import Datetime from "@/components/Datetime";
import { Badge } from "@mantine/core";

interface OrderApprovalStatusProps {
  is_active: boolean;
  order_status: number;
  approval_by_info: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
  approval_at?: string;
}

function OrderApprovalStatus({
  is_active,
  order_status,
  approval_by_info,
  approval_at,
}: OrderApprovalStatusProps) {
  if (!is_active) {
    return <Badge color="gray">Saved As Draft</Badge>;
  }
  if (order_status === 0) {
    return <Badge color="yellow">Approval Pending</Badge>;
  }
  if (order_status === 1) {
    if (approval_by_info && approval_at) {
      return (
        <Badge color="green">
          Approved by {approval_by_info.name} at{" "}
          <Datetime value={approval_at} />
        </Badge>
      );
    }
    return <Badge color="green">Approved</Badge>;
  }
  if (order_status === 2) {
    if (approval_by_info && approval_at) {
      return (
        <Badge color="red">
          Rejected by {approval_by_info.name} at{" "}
          <Datetime value={approval_at} />
        </Badge>
      );
    }
    return <Badge color="red">Rejected</Badge>;
  }
  return null;
}

export default OrderApprovalStatus;
