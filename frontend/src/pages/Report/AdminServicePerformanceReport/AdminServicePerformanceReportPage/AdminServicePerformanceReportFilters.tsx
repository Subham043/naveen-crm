import FilterClearBtn from "@/components/FilterClearBtn";
import { Group } from "@mantine/core";
import FromDateFilter from "../../../../components/CommonReportFilter/FromDateFilter";
import ToDateFilter from "../../../../components/CommonReportFilter/ToDateFilter";
import SelectPeriodType from "@/components/CommonReportFilter/SelectPeriodType";

function AdminServicePerformanceReportFilters() {
  return (
    <Group gap="xs">
      <SelectPeriodType />
      <FromDateFilter />
      <ToDateFilter />
      <FilterClearBtn />
    </Group>
  );
}

export default AdminServicePerformanceReportFilters;
