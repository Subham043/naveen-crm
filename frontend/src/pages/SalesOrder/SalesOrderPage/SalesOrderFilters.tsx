import FilterClearBtn from "@/components/FilterClearBtn";
import SelectOrderCreatedByMe from "@/components/Order/SelectOrderCreatedByMe";
import SelectOrderFilterStatus from "@/components/Order/SelectOrderFilterStatus";
import SelectOrderLeadSource from "@/components/Order/SelectOrderLeadSource";
import SearchField from "@/components/SearchField";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import { Group } from "@mantine/core";
import { useCallback } from "react";

function SalesOrderFilters() {
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
      <SelectOrderLeadSource />
      <SelectOrderFilterStatus />
      <SelectOrderCreatedByMe />
      <FilterClearBtn />
    </Group>
  );
}

export default SalesOrderFilters;
