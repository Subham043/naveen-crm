import FilterClearBtn from "@/components/FilterClearBtn";
import SelectQuotationApprovalByMe from "@/components/Quotation/SelectQuotationApprovalByMe";
import SelectQuotationLeadSource from "@/components/Quotation/SelectQuotationLeadSource";
import SelectQuotationStatus from "@/components/Quotation/SelectQuotationStatus";
import SearchField from "@/components/SearchField";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import FromDateFilter from "@/components/CommonReportFilter/FromDateFilter";
import ToDateFilter from "@/components/CommonReportFilter/ToDateFilter";
import { Box, Group } from "@mantine/core";
import { useCallback } from "react";

function QuotationFilters() {
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
      <Box w="170px">
        <FromDateFilter />
      </Box>
      <Box w="170px">
        <ToDateFilter />
      </Box>
      <SelectQuotationLeadSource />
      <SelectQuotationStatus />
      <SelectQuotationApprovalByMe />
      <FilterClearBtn />
    </Group>
  );
}

export default QuotationFilters;
