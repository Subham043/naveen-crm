import PermittedLayout from "@/layouts/PermittedLayout";
import { useSalesQuotationSubmitForApprovalMutation } from "@/utils/data/mutation/sales_quotation";
import { Button } from "@mantine/core";
import { IconUserStar } from "@tabler/icons-react";
import { useCallback } from "react";

const SalesQuotationSubmitForApprovalBtn = ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}) => {
  const salesQuotationSubmitForApproval =
    useSalesQuotationSubmitForApprovalMutation(id);

  const onSubmitForApprovalHandler = useCallback(async () => {
    await salesQuotationSubmitForApproval.mutateAsync();
  }, [salesQuotationSubmitForApproval.mutateAsync]);

  return (
    <PermittedLayout
      outletType="children"
      allowedRoles={["Sales-Team"]}
      additionalCondition={!is_active}
    >
      <Button
        leftSection={<IconUserStar size={16} />}
        variant="filled"
        color="cyan"
        type="button"
        onClick={onSubmitForApprovalHandler}
        disabled={salesQuotationSubmitForApproval.isPending}
        loading={salesQuotationSubmitForApproval.isPending}
      >
        Sale
      </Button>
    </PermittedLayout>
  );
};

export default SalesQuotationSubmitForApprovalBtn;
