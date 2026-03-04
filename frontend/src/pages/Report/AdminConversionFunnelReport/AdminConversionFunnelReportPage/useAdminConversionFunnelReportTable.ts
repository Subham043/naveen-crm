// useAdminConversionFunnelReportTable.ts

import { useAdminConversionFunnelReportsQuery } from "@/utils/data/query/report";

export function useAdminConversionFunnelReportTable() {

  const query = useAdminConversionFunnelReportsQuery();

  return {
    ...query,
  };
}
