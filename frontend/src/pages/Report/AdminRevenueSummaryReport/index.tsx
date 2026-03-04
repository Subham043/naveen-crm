import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import AdminRevenueSummaryReportFilters from "./AdminRevenueSummaryReportPage/AdminRevenueSummaryReportFilters";
import { useAdminRevenueSummaryReportTable } from "./AdminRevenueSummaryReportPage/useAdminRevenueSummaryReportTable";
import AdminRevenueSummaryReportTable from "./AdminRevenueSummaryReportPage/AdminRevenueSummaryReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import AdminRevenueSummaryReportExportBtn from "./AdminRevenueSummaryReportPage/AdminRevenueSummaryReportExportBtn";

/*
 * Admin Revenue Summary Report Page
 */
export default function AdminRevenueSummaryReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useAdminRevenueSummaryReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Revenue Summary Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <AdminRevenueSummaryReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <AdminRevenueSummaryReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <AdminRevenueSummaryReportTable
            adminRevenueSummaryReports={data?.data ?? []}
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
