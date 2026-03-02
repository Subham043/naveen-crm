import FilterClearBtn from "@/components/FilterClearBtn";
import SearchField from "@/components/SearchField";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import { Group } from "@mantine/core";
import { useCallback } from "react";
import SelectLogTypeFilter from "./SelectLogTypeFilter";
import SelectCauserFilter from "./SelectCauserFilter";
import type { AvailableRoles } from "@/utils/types";
import { useAuthStore } from "@/stores/auth.store";

type Props = {
  causers: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: AvailableRoles;
  }[];
};

function ActivityLogFilters({ causers }: Props) {
  const authUser = useAuthStore((state) => state.authUser);
  const { search, setSearch } = useSearchQueryParam();
  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value);
    },
    [setSearch],
  );
  return (
    <Group gap="xs">
      <SearchField defaultValue={search} onChange={onSearchChange} />
      <SelectLogTypeFilter />
      {authUser?.role === "Super-Admin" && (
        <SelectCauserFilter causers={causers} />
      )}
      <FilterClearBtn />
    </Group>
  );
}

export default ActivityLogFilters;
