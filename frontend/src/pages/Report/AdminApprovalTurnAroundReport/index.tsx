import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import AdminApprovalTurnAroundReportFilters from "./AdminApprovalTurnAroundReportPage/AdminApprovalTurnAroundReportFilters";
import { useAdminApprovalTurnAroundReportTable } from "./AdminApprovalTurnAroundReportPage/useAdminApprovalTurnAroundReportTable";
import AdminApprovalTurnAroundReportTable from "./AdminApprovalTurnAroundReportPage/AdminApprovalTurnAroundReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import AdminApprovalTurnAroundReportExportBtn from "./AdminApprovalTurnAroundReportPage/AdminApprovalTurnAroundReportExportBtn";

/*
 * Admin Approval Turn Around Report Page
 */
export default function AdminApprovalTurnAroundReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useAdminApprovalTurnAroundReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Approval Turn Around Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <AdminApprovalTurnAroundReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <AdminApprovalTurnAroundReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <AdminApprovalTurnAroundReportTable
            adminApprovalTurnAroundReports={data?.data ?? []}
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
