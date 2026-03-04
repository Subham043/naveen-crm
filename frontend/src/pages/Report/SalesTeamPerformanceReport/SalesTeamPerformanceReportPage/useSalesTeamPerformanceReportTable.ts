// useSalesTeamPerformanceReportTable.ts

import { useSalesTeamPerformanceReportsQuery } from "@/utils/data/query/sales_report";

export function useSalesTeamPerformanceReportTable() {

  const query = useSalesTeamPerformanceReportsQuery();

  return {
    ...query,
  };
}
