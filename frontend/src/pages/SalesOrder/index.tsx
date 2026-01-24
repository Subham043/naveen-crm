import SalesOrderForm from "./SalesOrderForm";
import PermittedLayout from "@/layouts/PermittedLayout";
import { type ExtendedModalProps } from "@/utils/types";
import { Box, Button, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import SalesOrderTable from "./SalesOrderPage/SalesOrderTable";
import SalesOrderFilters from "./SalesOrderPage/SalesOrderFilters";
import { useSalesOrderTable } from "./SalesOrderPage/useSalesOrderTable";
import { useCallback, useState } from "react";
import SalesOrderExportBtn from "./SalesOrderPage/SalesOrderExportBtn";

/*
 * Sales Order Page
 */
export default function SalesOrder() {
  const { data, isLoading, isFetching, isRefetching } = useSalesOrderTable();

  const [modal, setModal] = useState<
    ExtendedModalProps<{ id: undefined }, { id: number }>
  >({
    show: false,
    type: "create",
    id: undefined,
  });

  const handleModalClose = useCallback(
    () => setModal({ show: false, type: "create", id: undefined }),
    [],
  );

  const handleModalOpen = useCallback(() => {
    setModal({ show: true, type: "create", id: undefined });
  }, []);

  const handleModalUpdate = useCallback((id: number) => {
    setModal({ show: true, type: "update", id });
  }, []);

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Order</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Sales-Team"]}
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
                <SalesOrderExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <SalesOrderFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <SalesOrderTable
            salesOrders={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
            onEdit={handleModalUpdate}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
      <PermittedLayout outletType="children" allowedRoles={["Sales-Team"]}>
        <SalesOrderForm modal={modal} handleModalClose={handleModalClose} />
      </PermittedLayout>
    </>
  );
}
