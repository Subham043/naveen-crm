import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import SalesTeamPipelineStatusReportFilters from "./SalesTeamPipelineStatusReportPage/SalesTeamPipelineStatusReportFilters";
import { useSalesTeamPipelineStatusReportTable } from "./SalesTeamPipelineStatusReportPage/useSalesTeamPipelineStatusReportTable";
import SalesTeamPipelineStatusReportTable from "./SalesTeamPipelineStatusReportPage/SalesTeamPipelineStatusReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import SalesTeamPipelineStatusReportExportBtn from "./SalesTeamPipelineStatusReportPage/SalesTeamPipelineStatusReportExportBtn";

/*
 * Sales Team Pipeline Status Report Page
 */
export default function SalesTeamPipelineStatusReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useSalesTeamPipelineStatusReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Pipeline Status Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Sales-Team"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <SalesTeamPipelineStatusReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <SalesTeamPipelineStatusReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <SalesTeamPipelineStatusReportTable
            salesTeamPipelineStatusReports={data?.data ?? []}
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
