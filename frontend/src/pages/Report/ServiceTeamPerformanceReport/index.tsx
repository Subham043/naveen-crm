import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import ServiceTeamPerformanceReportFilters from "./ServiceTeamPerformanceReportPage/ServiceTeamPerformanceReportFilters";
import { useServiceTeamPerformanceReportTable } from "./ServiceTeamPerformanceReportPage/useServiceTeamPerformanceReportTable";
import ServiceTeamPerformanceReportTable from "./ServiceTeamPerformanceReportPage/ServiceTeamPerformanceReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import ServiceTeamPerformanceReportExportBtn from "./ServiceTeamPerformanceReportPage/ServiceTeamPerformanceReportExportBtn";

/*
 * Service Team Performance Report Page
 */
export default function ServiceTeamPerformanceReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useServiceTeamPerformanceReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Performance Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Service-Team"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <ServiceTeamPerformanceReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <ServiceTeamPerformanceReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <ServiceTeamPerformanceReportTable
            serviceTeamPerformanceReports={data?.data ?? []}
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
