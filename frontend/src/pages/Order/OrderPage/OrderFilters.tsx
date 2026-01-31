import FilterClearBtn from "@/components/FilterClearBtn";
import SelectOrderApprovalByMe from "@/components/Order/SelectOrderApprovalByMe";
import SelectOrderInvoiceStatus from "@/components/Order/SelectOrderInvoiceStatus";
import SelectOrderLeadSource from "@/components/Order/SelectOrderLeadSource";
import SelectOrderPaymentStatus from "@/components/Order/SelectOrderPaymentStatus";
import SelectOrderShipmentStatus from "@/components/Order/SelectOrderShipmentStatus";
import SelectOrderStatus from "@/components/Order/SelectOrderStatus";
import SearchField from "@/components/SearchField";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import { Group } from "@mantine/core";
import { useCallback } from "react";

function OrderFilters() {
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
      <SelectOrderStatus />
      <SelectOrderApprovalByMe />
      <SelectOrderPaymentStatus />
      <SelectOrderInvoiceStatus />
      <SelectOrderShipmentStatus />
      <FilterClearBtn />
    </Group>
  );
}

export default OrderFilters;
