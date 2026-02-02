import FilterClearBtn from "@/components/FilterClearBtn";
import { Group } from "@mantine/core";
import FromDateFilter from "../../CommonFilter/FromDateFilter";
import ToDateFilter from "../../CommonFilter/ToDateFilter";

function SalesReportFilters() {
  return (
    <Group gap="xs">
      <FromDateFilter />
      <ToDateFilter />
      <FilterClearBtn />
    </Group>
  );
}

export default SalesReportFilters;
