import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import SalesTeamLeadSourcePerformanceReportFilters from "./SalesTeamLeadSourcePerformanceReportPage/SalesTeamLeadSourcePerformanceReportFilters";
import { useSalesTeamLeadSourcePerformanceReportTable } from "./SalesTeamLeadSourcePerformanceReportPage/useSalesTeamLeadSourcePerformanceReportTable";
import SalesTeamLeadSourcePerformanceReportTable from "./SalesTeamLeadSourcePerformanceReportPage/SalesTeamLeadSourcePerformanceReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import SalesTeamLeadSourcePerformanceReportExportBtn from "./SalesTeamLeadSourcePerformanceReportPage/SalesTeamLeadSourcePerformanceReportExportBtn";

/*
 * Sales Team Lead Source Performance Report Page
 */
export default function SalesTeamLeadSourcePerformanceReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useSalesTeamLeadSourcePerformanceReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Lead Source Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Sales-Team"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <SalesTeamLeadSourcePerformanceReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <SalesTeamLeadSourcePerformanceReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <SalesTeamLeadSourcePerformanceReportTable
            salesTeamLeadSourcePerformance={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
    </>
  );
}
