import PermittedLayout from "@/layouts/PermittedLayout";
import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import QuotationTable from "./QuotationPage/QuotationTable";
import QuotationFilters from "./QuotationPage/QuotationFilters";
import { useQuotationTable } from "./QuotationPage/useQuotationTable";
import QuotationExportBtn from "./QuotationPage/QuotationExportBtn";

/*
 *Quotation Page
 */
export default function Quotation() {
  const { data, isLoading, isFetching, isRefetching } = useQuotationTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Quotation</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <QuotationExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <QuotationFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <QuotationTable
            quotations={data?.data ?? []}
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
