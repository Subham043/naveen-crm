import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import AdminServicePerformanceReportFilters from "./AdminServicePerformanceReportPage/AdminServicePerformanceReportFilters";
import { useAdminServicePerformanceReportTable } from "./AdminServicePerformanceReportPage/useAdminServicePerformanceReportTable";
import AdminServicePerformanceReportTable from "./AdminServicePerformanceReportPage/AdminServicePerformanceReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import AdminServicePerformanceReportExportBtn from "./AdminServicePerformanceReportPage/AdminServicePerformanceReportExportBtn";

/*
 * Admin Service Performance Report Page
 */
export default function AdminServicePerformanceReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useAdminServicePerformanceReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Service Performance Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <AdminServicePerformanceReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <AdminServicePerformanceReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <AdminServicePerformanceReportTable
            adminServicePerformanceReports={data?.data ?? []}
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
