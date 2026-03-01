// useQuotationTable.ts

import { useQuotationsQuery } from "@/utils/data/query/quotation";

export function useQuotationTable() {

  const query = useQuotationsQuery();

  return {
    ...query,
  };
}
