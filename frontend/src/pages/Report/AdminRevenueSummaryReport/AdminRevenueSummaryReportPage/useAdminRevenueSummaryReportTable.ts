// useAdminRevenueSummaryReportTable.ts

import { useAdminRevenueSummaryReportsQuery } from "@/utils/data/query/report";

export function useAdminRevenueSummaryReportTable() {

  const query = useAdminRevenueSummaryReportsQuery();

  return {
    ...query,
  };
}
