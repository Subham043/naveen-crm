import PermittedLayout from "@/layouts/PermittedLayout";
import { type ActivityLogType, type ModalProps } from "@/utils/types";
import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import ActivityLogFilters from "./ActivityLogPage/ActivityLogFilters";
import { useActivityLogTable } from "./ActivityLogPage/useActivityLogTable";
import { useCallback, useState } from "react";
import ActivityLogExportBtn from "./ActivityLogPage/ActivityLogExportBtn";
import ActivityLogTable from "./ActivityLogPage/ActivityLogTable";
import ActivityLogView from "./ActivityLogView";

/*
 * Activity Log Page
 */
export default function ActivityLog() {
  const { data, isLoading, isFetching, isRefetching } = useActivityLogTable();

  const [modal, setModal] = useState<ModalProps<{ data: ActivityLogType }>>({
    show: false,
  });

  const handleModalClose = useCallback(() => setModal({ show: false }), []);

  const handleModalUpdate = useCallback((data: ActivityLogType) => {
    setModal({ show: true, data });
  }, []);

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Activity Logs</Title>
            <PermittedLayout
              outletType="children"
              allowedRoles={["Super-Admin"]}
            >
              <Group gap="xs" justify="flex-end" align="center">
                <ActivityLogExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <ActivityLogFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <ActivityLogTable
            activityLogs={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
            onView={handleModalUpdate}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
      <PermittedLayout outletType="children" allowedRoles={["Super-Admin"]}>
        <ActivityLogView modal={modal} handleModalClose={handleModalClose} />
      </PermittedLayout>
    </>
  );
}
