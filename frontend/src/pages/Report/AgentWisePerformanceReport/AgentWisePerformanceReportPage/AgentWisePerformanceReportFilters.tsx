import FilterClearBtn from "@/components/FilterClearBtn";
import { Group } from "@mantine/core";
import FromDateFilter from "../../CommonFilter/FromDateFilter";
import ToDateFilter from "../../CommonFilter/ToDateFilter";

function AgentWisePerformanceReportFilters() {
  return (
    <Group gap="xs">
      <FromDateFilter />
      <ToDateFilter />
      <FilterClearBtn />
    </Group>
  );
}

export default AgentWisePerformanceReportFilters;
