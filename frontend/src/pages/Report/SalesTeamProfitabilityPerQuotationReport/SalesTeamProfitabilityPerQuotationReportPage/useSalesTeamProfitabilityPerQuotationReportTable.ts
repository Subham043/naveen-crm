// useSalesTeamProfitabilityPerQuotationReportTable.ts

import { useSalesTeamProfitabilityPerQuotationReportsQuery } from "@/utils/data/query/sales_report";

export function useSalesTeamProfitabilityPerQuotationReportTable() {

  const query = useSalesTeamProfitabilityPerQuotationReportsQuery();

  return {
    ...query,
  };
}
