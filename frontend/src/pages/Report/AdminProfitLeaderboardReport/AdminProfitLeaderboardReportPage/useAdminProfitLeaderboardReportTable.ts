// useAdminProfitLeaderboardReportTable.ts

import { useAdminProfitLeaderboardReportsQuery } from "@/utils/data/query/report";

export function useAdminProfitLeaderboardReportTable() {

  const query = useAdminProfitLeaderboardReportsQuery();

  return {
    ...query,
  };
}
