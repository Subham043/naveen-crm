// useSalesTeamPipelineStatusReportTable.ts

import { useSalesTeamPipelineStatusReportsQuery } from "@/utils/data/query/sales_report";

export function useSalesTeamPipelineStatusReportTable() {

  const query = useSalesTeamPipelineStatusReportsQuery();

  return {
    ...query,
  };
}
