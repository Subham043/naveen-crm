import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import SalesTeamTrendReportFilters from "./SalesTeamTrendReportPage/SalesTeamTrendReportFilters";
import { useSalesTeamTrendReportTable } from "./SalesTeamTrendReportPage/useSalesTeamTrendReportTable";
import SalesTeamTrendReportTable from "./SalesTeamTrendReportPage/SalesTeamTrendReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import SalesTeamTrendReportExportBtn from "./SalesTeamTrendReportPage/SalesTeamTrendReportExportBtn";

/*
 * Sales Team Trend Report Page
 */
export default function SalesTeamTrendReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useSalesTeamTrendReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Trend Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <SalesTeamTrendReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <SalesTeamTrendReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <SalesTeamTrendReportTable
            salesTeamTrendReports={data?.data ?? []}
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
