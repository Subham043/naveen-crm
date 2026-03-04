// useAdminOrderPaymentReportTable.ts

import { useAdminOrderPaymentReportsQuery } from "@/utils/data/query/report";

export function useAdminOrderPaymentReportTable() {

  const query = useAdminOrderPaymentReportsQuery();

  return {
    ...query,
  };
}
