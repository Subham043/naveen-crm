// useServiceTeamPerformanceReportTable.ts

import { useServiceTeamPerformanceReportsQuery } from "@/utils/data/query/service_team_report";

export function useServiceTeamPerformanceReportTable() {

  const query = useServiceTeamPerformanceReportsQuery();

  return {
    ...query,
  };
}
