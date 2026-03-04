import { useExcelExport } from "@/hooks/useExcelExport";
import { api_routes } from "@/utils/routes/api_routes";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const SalesTeamApprovalTurnAroundReportExportBtn = () => {
  const { exportExcel, excelLoading } = useExcelExport();

  const onExportHandler = useCallback(async () => {
    await exportExcel(
      api_routes.sales.reports.salesApprovalTurnAroundReport.excel,
      "sales_approval_turn_around_report.xlsx",
    );
  }, [exportExcel]);

  return (
    <Button
      variant="filled"
      color="cyan"
      type="button"
      onClick={onExportHandler}
      disabled={excelLoading}
      loading={excelLoading}
    >
      Export
    </Button>
  );
};

export default SalesTeamApprovalTurnAroundReportExportBtn;
