// useRevenueSummaryTable.ts

import { useRevenueSummaryReportsQuery } from "@/utils/data/query/report";

export function useRevenueSummaryTable() {

  const query = useRevenueSummaryReportsQuery();

  return {
    ...query,
  };
}
