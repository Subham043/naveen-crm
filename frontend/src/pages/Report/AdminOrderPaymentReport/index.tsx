import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import AdminOrderPaymentReportFilters from "./AdminOrderPaymentReportPage/AdminOrderPaymentReportFilters";
import { useAdminOrderPaymentReportTable } from "./AdminOrderPaymentReportPage/useAdminOrderPaymentReportTable";
import AdminOrderPaymentReportTable from "./AdminOrderPaymentReportPage/AdminOrderPaymentReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import AdminOrderPaymentReportExportBtn from "./AdminOrderPaymentReportPage/AdminOrderPaymentReportExportBtn";

/*
 * Admin Order Payment Report Page
 */
export default function AdminOrderPaymentReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useAdminOrderPaymentReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Order Payment Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <AdminOrderPaymentReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <AdminOrderPaymentReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <AdminOrderPaymentReportTable
            adminOrderPaymentReports={data?.data ?? []}
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
