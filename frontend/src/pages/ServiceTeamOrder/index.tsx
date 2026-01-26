import ServiceTeamOrderForm from "./ServiceTeamOrderForm";
import PermittedLayout from "@/layouts/PermittedLayout";
import { type ExtendedModalProps } from "@/utils/types";
import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import ServiceTeamOrderTable from "./ServiceTeamOrderPage/ServiceTeamOrderTable";
import ServiceTeamOrderFilters from "./ServiceTeamOrderPage/ServiceTeamOrderFilters";
import { useServiceTeamOrderTable } from "./ServiceTeamOrderPage/useServiceTeamOrderTable";
import { useCallback, useState } from "react";
import ServiceTeamOrderExportBtn from "./ServiceTeamOrderPage/ServiceTeamOrderExportBtn";

/*
 * ServiceTeam Order Page
 */
export default function ServiceTeamOrder() {
  const { data, isLoading, isFetching, isRefetching } =
    useServiceTeamOrderTable();

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
              allowedRoles={["Service-Team"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <ServiceTeamOrderExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <ServiceTeamOrderFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <ServiceTeamOrderTable
            serviceTeamOrders={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
            onEdit={handleModalUpdate}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
      <PermittedLayout outletType="children" allowedRoles={["Service-Team"]}>
        <ServiceTeamOrderForm
          modal={modal}
          handleModalClose={handleModalClose}
        />
      </PermittedLayout>
    </>
  );
}
