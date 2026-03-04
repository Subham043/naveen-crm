import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import AdminConversionFunnelReportFilters from "./AdminConversionFunnelReportPage/AdminConversionFunnelReportFilters";
import { useAdminConversionFunnelReportTable } from "./AdminConversionFunnelReportPage/useAdminConversionFunnelReportTable";
import AdminConversionFunnelReportTable from "./AdminConversionFunnelReportPage/AdminConversionFunnelReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import AdminConversionFunnelReportExportBtn from "./AdminConversionFunnelReportPage/AdminConversionFunnelReportExportBtn";

/*
 * AdminConversionFunnel Report Page
 */
export default function AdminConversionFunnelReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useAdminConversionFunnelReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Conversion Funnel Reports</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <AdminConversionFunnelReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <AdminConversionFunnelReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <AdminConversionFunnelReportTable
            adminConversionFunnelReports={data?.data ?? []}
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
