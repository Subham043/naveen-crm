import CustomLoading from "@/components/CustomLoading";
import { useSalesOrderSubmitForApprovalMutation } from "@/utils/data/mutation/sales_order";
import { Menu } from "@mantine/core";
import { IconUserStar } from "@tabler/icons-react";
import { useCallback } from "react";

const SalesSubmitForApprovalBtn = ({
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

  if (is_active) return null;

  return (
    <Menu.Item
      leftSection={
        !salesOrderSubmitForApproval.isPending ? (
          <IconUserStar size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={onSubmitForApprovalHandler}
      disabled={salesOrderSubmitForApproval.isPending}
    >
      {salesOrderSubmitForApproval.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <>Submit for approval</>
      )}
    </Menu.Item>
  );
};

export default SalesSubmitForApprovalBtn;
