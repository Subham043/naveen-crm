// useSalesTeamRevenueReportTable.ts

import { useSalesTeamRevenueReportsQuery } from "@/utils/data/query/sales_report";

export function useSalesTeamRevenueReportTable() {

  const query = useSalesTeamRevenueReportsQuery();

  return {
    ...query,
  };
}
