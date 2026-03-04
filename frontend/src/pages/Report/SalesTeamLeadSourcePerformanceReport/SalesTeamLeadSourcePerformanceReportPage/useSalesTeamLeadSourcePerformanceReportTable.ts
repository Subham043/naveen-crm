// useSalesTeamLeadSourcePerformanceReportTable.ts

import { useSalesTeamLeadSourcePerformanceReportsQuery } from "@/utils/data/query/sales_report";

export function useSalesTeamLeadSourcePerformanceReportTable() {

  const query = useSalesTeamLeadSourcePerformanceReportsQuery();

  return {
    ...query,
  };
}
