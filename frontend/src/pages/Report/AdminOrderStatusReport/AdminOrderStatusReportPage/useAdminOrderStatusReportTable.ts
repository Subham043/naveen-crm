// useAdminOrderStatusReportTable.ts

import { useAdminOrderStatusReportsQuery } from "@/utils/data/query/report";

export function useAdminOrderStatusReportTable() {

  const query = useAdminOrderStatusReportsQuery();

  return {
    ...query,
  };
}
