import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import RevenueSummaryFilters from "./RevenueSummaryPage/RevenueSummaryFilters";
import { useRevenueSummaryTable } from "./RevenueSummaryPage/useRevenueSummaryTable";
import RevenueSummaryTable from "./RevenueSummaryPage/RevenueSummaryTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import RevenueSummaryExportBtn from "./RevenueSummaryPage/RevenueSummaryExportBtn";

/*
 * Revenue Summary Page
 */
export default function RevenueSummary() {
  const { data, isLoading, isFetching, isRefetching } =
    useRevenueSummaryTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Revenue Summary</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <RevenueSummaryExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <RevenueSummaryFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <RevenueSummaryTable
            revenueSummary={data?.data ?? []}
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
