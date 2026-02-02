// useActivityLogTable.ts

import { useActivityLogsQuery } from "@/utils/data/query/activity_log";

export function useActivityLogTable() {

  const query = useActivityLogsQuery();

  return {
    ...query,
  };
}
