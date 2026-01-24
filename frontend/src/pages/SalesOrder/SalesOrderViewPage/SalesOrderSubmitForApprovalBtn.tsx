import PermittedLayout from "@/layouts/PermittedLayout";
import { useSalesOrderSubmitForApprovalMutation } from "@/utils/data/mutation/sales_order";
import { Button } from "@mantine/core";
import { IconUserStar } from "@tabler/icons-react";
import { useCallback } from "react";

const SalesOrderSubmitForApprovalBtn = ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}) => {
  const salesOrderSubmitForApproval =
    useSalesOrderSubmitForApprovalMutation(id);

  const onSubmitForApprovalHandler = useCallback(async () => {
    await salesOrderSubmitForApproval.mutateAsync();
  }, [salesOrderSubmitForApproval.mutateAsync]);

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
        disabled={salesOrderSubmitForApproval.isPending}
        loading={salesOrderSubmitForApproval.isPending}
      >
        Submit for approval
      </Button>
    </PermittedLayout>
  );
};

export default SalesOrderSubmitForApprovalBtn;
