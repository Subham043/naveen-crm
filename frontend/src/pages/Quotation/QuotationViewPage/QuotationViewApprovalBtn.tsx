import PermittedLayout from "@/layouts/PermittedLayout";
import { useQuotationApprovalMutation } from "@/utils/data/mutation/quotation";
import { Button } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCallback } from "react";

const QuotationViewApprovalBtn = ({
  id,
  is_active,
  quotation_status,
  update_quotation_status,
}: {
  id: number;
  is_active: boolean;
  quotation_status: 0 | 1 | 2;
  update_quotation_status: 1 | 2;
}) => {
  const quotationSubmitForApproval = useQuotationApprovalMutation(id);

  const onApprovalHandler = useCallback(async () => {
    await quotationSubmitForApproval.mutateAsync({
      quotation_status: update_quotation_status,
    });
  }, [quotationSubmitForApproval.mutateAsync, update_quotation_status]);

  return (
    <PermittedLayout
      outletType="children"
      allowedRoles={["Super-Admin"]}
      additionalCondition={is_active && quotation_status === 0}
    >
      <Button
        leftSection={
          update_quotation_status === 1 ? (
            <IconCheck size={16} />
          ) : (
            <IconX size={16} />
          )
        }
        variant="filled"
        color={update_quotation_status === 1 ? "green" : "red"}
        type="button"
        onClick={onApprovalHandler}
        disabled={quotationSubmitForApproval.isPending}
        loading={quotationSubmitForApproval.isPending}
      >
        {update_quotation_status === 1 ? "Charge" : "Reject"}
      </Button>
    </PermittedLayout>
  );
};

export default QuotationViewApprovalBtn;
