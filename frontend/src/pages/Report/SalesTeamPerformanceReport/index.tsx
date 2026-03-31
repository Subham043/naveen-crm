import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import SalesTeamPerformanceReportFilters from "./SalesTeamPerformanceReportPage/SalesTeamPerformanceReportFilters";
import { useSalesTeamPerformanceReportTable } from "./SalesTeamPerformanceReportPage/useSalesTeamPerformanceReportTable";
import SalesTeamPerformanceReportTable from "./SalesTeamPerformanceReportPage/SalesTeamPerformanceReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import SalesTeamPerformanceReportExportBtn from "./SalesTeamPerformanceReportPage/SalesTeamPerformanceReportExportBtn";

/*
 * Sales Team Performance Report Page
 */
export default function SalesTeamPerformanceReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useSalesTeamPerformanceReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Performance Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Sales-Team"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <SalesTeamPerformanceReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <SalesTeamPerformanceReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <SalesTeamPerformanceReportTable
            salesTeamPerformanceReports={data?.data ?? []}
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
