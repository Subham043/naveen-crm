import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import SalesTeamProfitabilityPerQuotationReportFilters from "./SalesTeamProfitabilityPerQuotationReportPage/SalesTeamProfitabilityPerQuotationReportFilters";
import { useSalesTeamProfitabilityPerQuotationReportTable } from "./SalesTeamProfitabilityPerQuotationReportPage/useSalesTeamProfitabilityPerQuotationReportTable";
import SalesTeamProfitabilityPerQuotationReportTable from "./SalesTeamProfitabilityPerQuotationReportPage/SalesTeamProfitabilityPerQuotationReportTable";
import PermittedLayout from "@/layouts/PermittedLayout";
import SalesTeamProfitabilityPerQuotationReportExportBtn from "./SalesTeamProfitabilityPerQuotationReportPage/SalesTeamProfitabilityPerQuotationReportExportBtn";

/*
 * Sales Team Profitability Per Quotation Report Page
 */
export default function SalesTeamProfitabilityPerQuotationReport() {
  const { data, isLoading, isFetching, isRefetching } =
    useSalesTeamProfitabilityPerQuotationReportTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Profitability Per Quotation Report</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <SalesTeamProfitabilityPerQuotationReportExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <SalesTeamProfitabilityPerQuotationReportFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <SalesTeamProfitabilityPerQuotationReportTable
            salesTeamProfitabilityPerQuotationReports={data?.data ?? []}
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
