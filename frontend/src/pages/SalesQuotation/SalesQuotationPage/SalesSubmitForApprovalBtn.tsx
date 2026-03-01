import CustomLoading from "@/components/CustomLoading";
import { useSalesQuotationSubmitForApprovalMutation } from "@/utils/data/mutation/sales_quotation";
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
  const salesQuotationSubmitForApproval =
    useSalesQuotationSubmitForApprovalMutation(id);

  const onSubmitForApprovalHandler = useCallback(async () => {
    await salesQuotationSubmitForApproval.mutateAsync();
  }, [salesQuotationSubmitForApproval.mutateAsync]);

  if (is_active) return null;

  return (
    <Menu.Item
      leftSection={
        !salesQuotationSubmitForApproval.isPending ? (
          <IconUserStar size={16} stroke={1.5} />
        ) : undefined
      }
      type="button"
      onClick={onSubmitForApprovalHandler}
      disabled={salesQuotationSubmitForApproval.isPending}
    >
      {salesQuotationSubmitForApproval.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <>Sale</>
      )}
    </Menu.Item>
  );
};

export default SalesSubmitForApprovalBtn;
