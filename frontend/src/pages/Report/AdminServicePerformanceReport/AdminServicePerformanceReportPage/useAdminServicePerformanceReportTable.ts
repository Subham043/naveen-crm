// useAdminServicePerformanceReportTable.ts

import { useAdminServicePerformanceReportsQuery } from "@/utils/data/query/report";

export function useAdminServicePerformanceReportTable() {

  const query = useAdminServicePerformanceReportsQuery();

  return {
    ...query,
  };
}
