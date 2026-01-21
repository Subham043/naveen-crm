import { useExcelExport } from "@/hooks/useExcelExport";
import { api_routes } from "@/utils/routes/api_routes";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const UserExportBtn = () => {
  const { exportExcel, excelLoading } = useExcelExport();

  const onVerifyHandler = useCallback(async () => {
    await exportExcel(api_routes.users.excel, "users.xlsx");
  }, [exportExcel]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onVerifyHandler}
      disabled={excelLoading}
      loading={excelLoading}
    >
      Export
    </Button>
  );
};

export default UserExportBtn;
