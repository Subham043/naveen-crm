import FilterClearBtn from "@/components/FilterClearBtn";
import SelectOrderInvoiceStatus from "@/components/Order/SelectOrderInvoiceStatus";
import SelectOrderLeadSource from "@/components/Order/SelectOrderLeadSource";
import SelectOrderPaymentStatus from "@/components/Order/SelectOrderPaymentStatus";
import SelectOrderShipmentStatus from "@/components/Order/SelectOrderShipmentStatus";
import SearchField from "@/components/SearchField";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import { Group } from "@mantine/core";
import { useCallback } from "react";

function ServiceTeamOrderFilters() {
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
      <SelectOrderPaymentStatus />
      <SelectOrderInvoiceStatus />
      <SelectOrderShipmentStatus />
      <FilterClearBtn />
    </Group>
  );
}

export default ServiceTeamOrderFilters;
