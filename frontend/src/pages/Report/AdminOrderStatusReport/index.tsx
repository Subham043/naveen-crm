import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import AdminOrderStatusReportFilters from "./AdminOrderStatusReportPage/AdminOrderStatusReportFilters";
import { useAdminOrderStatusReportTable } from "./AdminOrderStatusReportPage/useAdminOrderStatusReportTable";
import AdminOrderStatusReportTable from "./AdminOrderStatusReportPage/AdminOrderStatusReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import AdminOrderStatusReportExportBtn from "./AdminOrderStatusReportPage/AdminOrderStatusReportExportBtn";

/*
 * Admin Order Status Report Page
 */
export default function AdminOrderStatusReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useAdminOrderStatusReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Order Status Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <AdminOrderStatusReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <AdminOrderStatusReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <AdminOrderStatusReportTable
            adminOrderStatusReports={data?.data ?? []}
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
