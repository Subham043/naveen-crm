import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import AdminProfitLeaderboardReportFilters from "./AdminProfitLeaderboardReportPage/AdminProfitLeaderboardReportFilters";
import { useAdminProfitLeaderboardReportTable } from "./AdminProfitLeaderboardReportPage/useAdminProfitLeaderboardReportTable";
import AdminProfitLeaderboardReportTable from "./AdminProfitLeaderboardReportPage/AdminProfitLeaderboardReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import AdminProfitLeaderboardReportExportBtn from "./AdminProfitLeaderboardReportPage/AdminProfitLeaderboardReportExportBtn";

/*
 * Admin Profit Leaderboard Report Page
 */
export default function AdminProfitLeaderboardReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useAdminProfitLeaderboardReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Profit Leaderboard Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <AdminProfitLeaderboardReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <AdminProfitLeaderboardReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <AdminProfitLeaderboardReportTable
            adminProfitLeaderboardReports={data?.data ?? []}
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
