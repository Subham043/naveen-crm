import Datetime from "@/components/Datetime";
import { Badge } from "@mantine/core";

interface QuotationApprovalStatusProps {
  is_active: boolean;
  quotation_status: number;
  approval_by_info: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
  approval_at?: string;
}

function QuotationApprovalStatus({
  is_active,
  quotation_status,
  approval_by_info,
  approval_at,
}: QuotationApprovalStatusProps) {
  if (!is_active) {
    return <Badge color="gray">Saved As Draft</Badge>;
  }
  if (quotation_status === 0) {
    return <Badge color="yellow">Approval Pending</Badge>;
  }
  if (quotation_status === 1) {
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
  if (quotation_status === 2) {
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

export default QuotationApprovalStatus;
