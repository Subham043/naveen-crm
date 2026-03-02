import FilterClearBtn from "@/components/FilterClearBtn";
import SelectOrderInvoiceStatus from "@/components/Order/SelectOrderInvoiceStatus";
import SelectOrderPaymentCardType from "@/components/Order/SelectOrderPaymentCardType";
import SelectOrderPaymentGateway from "@/components/Order/SelectOrderPaymentGateway";
import SelectOrderPaymentStatus from "@/components/Order/SelectOrderPaymentStatus";
import SelectOrderShipmentStatus from "@/components/Order/SelectOrderShipmentStatus";
import SelectOrderStatus from "@/components/Order/SelectOrderStatus";
import SelectQuotationLeadSource from "@/components/Quotation/SelectQuotationLeadSource";
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
      <SelectQuotationLeadSource />
      <SelectOrderPaymentStatus />
      <SelectOrderPaymentCardType />
      <SelectOrderPaymentGateway />
      <SelectOrderInvoiceStatus />
      <SelectOrderShipmentStatus />
      <SelectOrderStatus />
      <FilterClearBtn />
    </Group>
  );
}

export default ServiceTeamOrderFilters;
