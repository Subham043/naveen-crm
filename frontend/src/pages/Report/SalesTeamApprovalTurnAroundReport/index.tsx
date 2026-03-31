import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import SalesTeamApprovalTurnAroundReportFilters from "./SalesTeamApprovalTurnAroundReportPage/SalesTeamApprovalTurnAroundReportFilters";
import { useSalesTeamApprovalTurnAroundReportTable } from "./SalesTeamApprovalTurnAroundReportPage/useSalesTeamApprovalTurnAroundReportTable";
import SalesTeamApprovalTurnAroundReportTable from "./SalesTeamApprovalTurnAroundReportPage/SalesTeamApprovalTurnAroundReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import SalesTeamApprovalTurnAroundReportExportBtn from "./SalesTeamApprovalTurnAroundReportPage/SalesTeamApprovalTurnAroundReportExportBtn";

/*
 * Sales Team Approval Turn Around Report Page
 */
export default function SalesTeamApprovalTurnAroundReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useSalesTeamApprovalTurnAroundReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Approval Turn Around Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Sales-Team"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <SalesTeamApprovalTurnAroundReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <SalesTeamApprovalTurnAroundReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <SalesTeamApprovalTurnAroundReportTable
            salesTeamApprovalTurnAround={data?.data ?? []}
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
