import PermittedLayout from "@/layouts/PermittedLayout";
import { useOrderApprovalMutation } from "@/utils/data/mutation/order";
import { Button } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCallback } from "react";

const OrderViewApprovalBtn = ({
  id,
  is_active,
  order_status,
  update_order_status,
}: {
  id: number;
  is_active: boolean;
  order_status: 0 | 1 | 2;
  update_order_status: 1 | 2;
}) => {
  const orderSubmitForApproval = useOrderApprovalMutation(id);

  const onApprovalHandler = useCallback(async () => {
    await orderSubmitForApproval.mutateAsync({
      order_status: update_order_status,
    });
  }, [orderSubmitForApproval.mutateAsync, update_order_status]);

  return (
    <PermittedLayout
      outletType="children"
      allowedRoles={["Super-Admin"]}
      additionalCondition={is_active && order_status === 0}
    >
      <Button
        leftSection={
          update_order_status === 1 ? (
            <IconCheck size={16} />
          ) : (
            <IconX size={16} />
          )
        }
        variant="filled"
        color={update_order_status === 1 ? "green" : "red"}
        type="button"
        onClick={onApprovalHandler}
        disabled={orderSubmitForApproval.isPending}
        loading={orderSubmitForApproval.isPending}
      >
        {update_order_status === 1 ? "Approve" : "Reject"}
      </Button>
    </PermittedLayout>
  );
};

export default OrderViewApprovalBtn;
