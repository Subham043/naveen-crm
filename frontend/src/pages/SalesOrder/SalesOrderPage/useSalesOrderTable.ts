// useSalesOrderTable.ts

import { useSalesOrdersQuery } from "@/utils/data/query/sales_order";

export function useSalesOrderTable() {

  const query = useSalesOrdersQuery();

  return {
    ...query,
  };
}
