import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import AgentWisePerformanceReportFilters from "./AgentWisePerformanceReportPage/AgentWisePerformanceReportFilters";
import { useAgentWisePerformanceReportTable } from "./AgentWisePerformanceReportPage/useAgentWisePerformanceReportTable";
import AgentWisePerformanceReportTable from "./AgentWisePerformanceReportPage/AgentWisePerformanceReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import AgentWisePerformanceReportExportBtn from "./AgentWisePerformanceReportPage/AgentWisePerformanceReportExportBtn";

/*
 * Agent Wise Performance Report Page
 */
export default function AgentWisePerformanceReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useAgentWisePerformanceReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Agent Wise Performance Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <AgentWisePerformanceReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <AgentWisePerformanceReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <AgentWisePerformanceReportTable
            agentWisePerformanceReports={data?.data ?? []}
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
