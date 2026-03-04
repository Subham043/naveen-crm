import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import AdminSalesPerformanceReportFilters from "./AdminSalesPerformanceReportPage/AdminSalesPerformanceReportFilters";
import { useAdminSalesPerformanceReportTable } from "./AdminSalesPerformanceReportPage/useAdminSalesPerformanceReportTable";
import AdminSalesPerformanceReportTable from "./AdminSalesPerformanceReportPage/AdminSalesPerformanceReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import AdminSalesPerformanceReportExportBtn from "./AdminSalesPerformanceReportPage/AdminSalesPerformanceReportExportBtn";

/*
 * Admin Sales Performance Report Page
 */
export default function AdminSalesPerformanceReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useAdminSalesPerformanceReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Sales Performance Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <AdminSalesPerformanceReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <AdminSalesPerformanceReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <AdminSalesPerformanceReportTable
            adminSalesPerformanceReports={data?.data ?? []}
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
