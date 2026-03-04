// useAdminApprovalTurnAroundReportTable.ts

import { useAdminApprovalTurnAroundReportsQuery } from "@/utils/data/query/report";

export function useAdminApprovalTurnAroundReportTable() {

  const query = useAdminApprovalTurnAroundReportsQuery();

  return {
    ...query,
  };
}
