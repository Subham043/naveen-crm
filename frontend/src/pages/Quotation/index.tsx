import PermittedLayout from "@/layouts/PermittedLayout";
import { Box, Button, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import QuotationTable from "./QuotationPage/QuotationTable";
import QuotationFilters from "./QuotationPage/QuotationFilters";
import { useQuotationTable } from "./QuotationPage/useQuotationTable";
import QuotationExportBtn from "./QuotationPage/QuotationExportBtn";
import { useCallback, useState } from "react";
import type { ExtendedModalProps } from "@/utils/types";
import QuotationForm from "./QuotationForm";

/*
 *Quotation Page
 */
export default function Quotation() {
  const { data, isLoading, isFetching, isRefetching } = useQuotationTable();

  const [modal, setModal] = useState<
    ExtendedModalProps<{ id: undefined }, { id: number }>
  >({
    show: false,
    type: "create",
    id: undefined,
  });

  const handleModalOpen = useCallback(() => {
    setModal({ show: true, type: "create", id: undefined });
  }, []);

  const handleModalClose = useCallback(
    () => setModal({ show: false, type: "create", id: undefined }),
    [],
  );

  const handleModalUpdate = useCallback((id: number) => {
    setModal({ show: true, type: "update", id });
  }, []);

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
                <Button
                  variant="filled"
                  color="teal"
                  type="button"
                  onClick={handleModalOpen}
                >
                  ADD
                </Button>
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
            onEdit={handleModalUpdate}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
      <PermittedLayout outletType="children" allowedRoles={["Super-Admin"]}>
        <QuotationForm modal={modal} handleModalClose={handleModalClose} />
      </PermittedLayout>
    </>
  );
}
