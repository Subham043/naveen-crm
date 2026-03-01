// useSalesQuotationTable.ts

import { useSalesQuotationsQuery } from "@/utils/data/query/sales_quotation";

export function useSalesQuotationTable() {

  const query = useSalesQuotationsQuery();

  return {
    ...query,
  };
}
