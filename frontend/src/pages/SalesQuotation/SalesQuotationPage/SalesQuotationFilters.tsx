import FilterClearBtn from "@/components/FilterClearBtn";
import SelectQuotationCreatedByMe from "@/components/Quotation/SelectQuotationCreatedByMe";
import SelectQuotationFilterStatus from "@/components/Quotation/SelectQuotationFilterStatus";
import SelectQuotationLeadSource from "@/components/Quotation/SelectQuotationLeadSource";
import SearchField from "@/components/SearchField";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import { Group } from "@mantine/core";
import { useCallback } from "react";

function SalesQuotationFilters() {
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
      <SelectQuotationLeadSource />
      <SelectQuotationFilterStatus />
      <SelectQuotationCreatedByMe />
      <FilterClearBtn />
    </Group>
  );
}

export default SalesQuotationFilters;
