import { useExcelExport } from "@/hooks/useExcelExport";
import { api_routes } from "@/utils/routes/api_routes";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const RevenueSummaryExportBtn = () => {
  const { exportExcel, excelLoading } = useExcelExport();

  const onExportHandler = useCallback(async () => {
    await exportExcel(
      api_routes.reports.revenueSummary.excel,
      "revenue_summary.xlsx",
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

export default RevenueSummaryExportBtn;
