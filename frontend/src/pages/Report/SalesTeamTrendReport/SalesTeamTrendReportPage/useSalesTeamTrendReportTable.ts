// useSalesTeamTrendReportTable.ts

import { useSalesTeamTrendReportsQuery } from "@/utils/data/query/sales_report";

export function useSalesTeamTrendReportTable() {

  const query = useSalesTeamTrendReportsQuery();

  return {
    ...query,
  };
}
