import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import SalesReportFilters from "./SalesReportPage/SalesReportFilters";
import { useSalesReportTable } from "./SalesReportPage/useSalesReportTable";
import SalesReportTable from "./SalesReportPage/SalesReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import SalesReportExportBtn from "./SalesReportPage/SalesReportExportBtn";

/*
 * Sales Report Page
 */
export default function SalesReport() {
  const { data, isLoading, isFetching, isRefetching } = useSalesReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Sales Reports</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <SalesReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <SalesReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <SalesReportTable
            salesReports={data?.data ?? []}
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
