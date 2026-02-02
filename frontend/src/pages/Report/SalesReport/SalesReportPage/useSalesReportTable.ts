// useSalesReportTable.ts

import { useSalesReportsQuery } from "@/utils/data/query/report";

export function useSalesReportTable() {

  const query = useSalesReportsQuery();

  return {
    ...query,
  };
}
