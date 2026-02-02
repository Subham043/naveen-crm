// useAgentWisePerformanceReportTable.ts

import { useAgentPerformanceReportsQuery } from "@/utils/data/query/report";

export function useAgentWisePerformanceReportTable() {

  const query = useAgentPerformanceReportsQuery();

  return {
    ...query,
  };
}
