import CustomLoading from "@/components/CustomLoading";
import { useQuotationApprovalMutation } from "@/utils/data/mutation/quotation";
import { Menu } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCallback } from "react";

const QuotationApprovalBtn = ({
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

  if (!is_active || quotation_status === 1 || quotation_status === 2)
    return null;

  return (
    <Menu.Item
      leftSection={
        !quotationSubmitForApproval.isPending ? (
          update_quotation_status === 1 ? (
            <IconCheck size={16} stroke={1.5} />
          ) : (
            <IconX size={16} stroke={1.5} />
          )
        ) : undefined
      }
      type="button"
      color={update_quotation_status === 1 ? "green" : "red"}
      onClick={onApprovalHandler}
      disabled={quotationSubmitForApproval.isPending}
    >
      {quotationSubmitForApproval.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <>{update_quotation_status === 1 ? "Charge" : "Reject"}</>
      )}
    </Menu.Item>
  );
};

export default QuotationApprovalBtn;
