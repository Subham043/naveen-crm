// useServiceTeamOrderTable.ts

import { useServiceTeamOrdersQuery } from "@/utils/data/query/service_team_order";

export function useServiceTeamOrderTable() {

  const query = useServiceTeamOrdersQuery();

  return {
    ...query,
  };
}
