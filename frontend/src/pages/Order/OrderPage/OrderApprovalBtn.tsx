import CustomLoading from "@/components/CustomLoading";
import { useOrderApprovalMutation } from "@/utils/data/mutation/order";
import { Menu } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCallback } from "react";

const OrderApprovalBtn = ({
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

  if (!is_active || order_status === 1 || order_status === 2) return null;

  return (
    <Menu.Item
      leftSection={
        !orderSubmitForApproval.isPending ? (
          update_order_status === 1 ? (
            <IconCheck size={16} stroke={1.5} />
          ) : (
            <IconX size={16} stroke={1.5} />
          )
        ) : undefined
      }
      type="button"
      color={update_order_status === 1 ? "green" : "red"}
      onClick={onApprovalHandler}
      disabled={orderSubmitForApproval.isPending}
    >
      {orderSubmitForApproval.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <>{update_order_status === 1 ? "Approve" : "Reject"}</>
      )}
    </Menu.Item>
  );
};

export default OrderApprovalBtn;
