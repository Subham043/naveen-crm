import FilterClearBtn from "@/components/FilterClearBtn";
import { Group } from "@mantine/core";
import FromDateFilter from "../../../../components/CommonReportFilter/FromDateFilter";
import ToDateFilter from "../../../../components/CommonReportFilter/ToDateFilter";

function AdminConversionFunnelReportFilters() {
  return (
    <Group gap="xs">
      <FromDateFilter />
      <ToDateFilter />
      <FilterClearBtn />
    </Group>
  );
}

export default AdminConversionFunnelReportFilters;
