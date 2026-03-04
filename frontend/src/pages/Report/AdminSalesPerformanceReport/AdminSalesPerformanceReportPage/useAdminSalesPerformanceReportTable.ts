// useAdminSalesPerformanceReportTable.ts

import { useAdminSalesPerformanceReportsQuery } from "@/utils/data/query/report";

export function useAdminSalesPerformanceReportTable() {

  const query = useAdminSalesPerformanceReportsQuery();

  return {
    ...query,
  };
}
