import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import SalesTeamRevenueReportFilters from "./SalesTeamRevenueReportPage/SalesTeamRevenueReportFilters";
import { useSalesTeamRevenueReportTable } from "./SalesTeamRevenueReportPage/useSalesTeamRevenueReportTable";
import SalesTeamRevenueReportTable from "./SalesTeamRevenueReportPage/SalesTeamRevenueReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import SalesTeamRevenueReportExportBtn from "./SalesTeamRevenueReportPage/SalesTeamRevenueReportExportBtn";

/*
 * Sales Team Revenue Report Page
 */
export default function SalesTeamRevenueReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useSalesTeamRevenueReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Revenue Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Sales-Team"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <SalesTeamRevenueReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <SalesTeamRevenueReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <SalesTeamRevenueReportTable
            salesTeamRevenueReports={data?.data ?? []}
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
