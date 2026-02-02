import TableRowLoading from "@/components/TableRowLoading";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { ActivityLogType } from "@/utils/types";
import { ActionIcon, Avatar, Box, Group, Table, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";

type ActivityLogTableProps = {
  activityLogs: ActivityLogType[];
  loading: boolean;
  onView: (data: ActivityLogType) => void;
};

const ActivityLogRow = memo(
  ({
    id,
    event,
    description,
    causer,
    causer_id,
    properties,
    log_name,
    subject_id,
    created_at,
    updated_at,
    onView,
  }: ActivityLogType & {
    onView: (data: ActivityLogType) => void;
  }) => {
    const onViewHandler = useCallback(() => {
      onView({
        id,
        event,
        description,
        causer,
        causer_id,
        properties,
        log_name,
        subject_id,
        created_at,
        updated_at,
      });
    }, [
      onView,
      id,
      event,
      description,
      causer,
      causer_id,
      properties,
      log_name,
      subject_id,
      created_at,
      updated_at,
    ]);
    return (
      <Table.Tr key={id}>
        <Table.Td>{id}</Table.Td>
        <Table.Td>{log_name}</Table.Td>
        <Table.Td>{description}</Table.Td>
        <Table.Td>{event}</Table.Td>
        <Table.Td>
          {causer ? (
            <Group gap={7} align="flex-start">
              <Avatar
                name={causer.name}
                color="initials"
                alt={causer.name}
                radius="xl"
                size={30}
              />
              <Box>
                <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                  {causer.name}
                </Text>
                <Text
                  fw={500}
                  fs="italic"
                  size="xs"
                  lh={1}
                  ml={3}
                  tt="lowercase"
                  mt={5}
                >
                  {causer.email}
                </Text>
                {causer.phone && (
                  <Text
                    fw={500}
                    fs="italic"
                    size="xs"
                    lh={1}
                    ml={3}
                    tt="lowercase"
                    mt={5}
                  >
                    {causer.phone}
                  </Text>
                )}
              </Box>
            </Group>
          ) : (
            "N/A"
          )}
        </Table.Td>
        <Table.Td>
          <Datetime value={created_at} />
        </Table.Td>
        <Table.Td>
          <PermittedLayout outletType="children" allowedRoles={["Super-Admin"]}>
            <Group justify="end" gap="xs">
              <ActionIcon
                variant="filled"
                color="yellow"
                onClick={onViewHandler}
              >
                <IconEye size={16} stroke={1.5} />
              </ActionIcon>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function ActivityLogTable({
  loading,
  activityLogs,
  onView,
}: ActivityLogTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>ID</Table.Th>
            <Table.Th>LOG NAME</Table.Th>
            <Table.Th>DESCRIPTION</Table.Th>
            <Table.Th>EVENT</Table.Th>
            <Table.Th>DONE BY</Table.Th>
            <Table.Th>DONE AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={7} />
          ) : activityLogs.length > 0 ? (
            activityLogs.map((item) => (
              <ActivityLogRow key={item.id} {...item} onView={onView} />
            ))
          ) : (
            <TableRowNotFound colSpan={7} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default ActivityLogTable;
