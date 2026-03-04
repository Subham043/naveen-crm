// useSalesTeamApprovalTurnAroundReportTable.ts

import { useSalesTeamApprovalTurnAroundReportsQuery } from "@/utils/data/query/sales_report";

export function useSalesTeamApprovalTurnAroundReportTable() {

  const query = useSalesTeamApprovalTurnAroundReportsQuery();

  return {
    ...query,
  };
}
