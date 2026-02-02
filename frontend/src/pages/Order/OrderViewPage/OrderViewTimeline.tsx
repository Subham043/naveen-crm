import {
  Box,
  Divider,
  Paper,
  Text,
  Timeline,
  Title,
  Alert,
  List,
  Kbd,
  Group,
  Select,
  Pagination,
  ActionIcon,
} from "@mantine/core";
import type { OrderType } from "@/utils/types";
import { useOrderTimelineQuery } from "@/utils/data/query/order_timeline";
import CustomLoading from "@/components/CustomLoading";
import Datetime from "@/components/Datetime";
import { IconMessage, IconRefresh } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import PermittedLayout from "@/layouts/PermittedLayout";

type Props = {
  id: OrderType["id"];
};

function OrderViewTimeline({ id }: Props) {
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(10);

  const { data, isLoading, isFetching, isRefetching, refetch } =
    useOrderTimelineQuery(id, {
      page,
      total,
    });

  const onLimitChange = useCallback(
    (value: string | null) => {
      setTotal(value ? Number(value) : 10);
      setPage(1);
    },
    [setTotal],
  );

  const onPageChange = useCallback(
    (value: number) => {
      setPage(value);
    },
    [setPage],
  );

  const totalPages = useMemo(() => {
    return Math.ceil((data ? data.meta.total : 0) / Number(total));
  }, [data, total]);

  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={5}>Timeline</Title>
          <PermittedLayout
            outletType="children"
            allowedRoles={["Super-Admin"]}
            additionalCondition={
              !(isLoading || isFetching || isRefetching) &&
              data &&
              data.data.length > 0
            }
          >
            <ActionIcon variant="filled" color="dark" onClick={() => refetch()}>
              <IconRefresh size={16} stroke={1.5} />
            </ActionIcon>
          </PermittedLayout>
        </Group>
      </Box>
      <Divider />
      <Box p="sm">
        {isLoading || isFetching || isRefetching ? (
          <CustomLoading size="sm" color="blue" />
        ) : data && data.data.length > 0 ? (
          <Timeline active={data.data.length} bulletSize={25}>
            {data.data.map((item) => (
              <Timeline.Item key={item.id} title={item.message}>
                {item.comment && (
                  <Alert
                    variant="light"
                    color="blue"
                    title={`${item.done_by.name} (${item.done_by.role})`}
                    icon={<IconMessage />}
                    w="fit-content"
                    p="xs"
                    mt={4}
                  >
                    <i>{item.comment}</i>
                  </Alert>
                )}
                {item.properties && item.properties.length > 0 && (
                  <>
                    <Text c="dimmed" size="sm" mt={6}>
                      The following fields have been updated:
                    </Text>
                    <List mt={5} withPadding>
                      {item.properties?.map((prop, i) =>
                        Object.entries(prop).map(
                          ([key, { old, new: newValue }]) => (
                            <List.Item key={`${i}-${key}`} mt={4}>
                              <Kbd>{key}</Kbd> : <Kbd>{String(old)}</Kbd> →{" "}
                              <Kbd>{String(newValue)}</Kbd>
                            </List.Item>
                          ),
                        ),
                      )}
                    </List>
                  </>
                )}
                <Text size="xs" mt={7}>
                  <Datetime value={item.created_at} />
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Text c="dimmed" size="sm" ta="center">
            No timeline data available
          </Text>
        )}
      </Box>
      {!(isLoading || isFetching || isRefetching) &&
        data &&
        data.data.length > 0 && (
          <>
            <Divider />
            <Box p="sm">
              <Group justify="center">
                <Select
                  data={["10", "20", "30"]}
                  placeholder="Items Per Page"
                  w={80}
                  value={total.toString()}
                  onChange={onLimitChange}
                />
                <Pagination
                  boundaries={2}
                  total={totalPages}
                  value={page}
                  onChange={onPageChange}
                />
              </Group>
            </Box>
          </>
        )}
    </Paper>
  );
}

export default OrderViewTimeline;
