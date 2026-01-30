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
} from "@mantine/core";
import type { OrderType } from "@/utils/types";
import { useOrderTimelineQuery } from "@/utils/data/query/order_timeline";
import CustomLoading from "@/components/CustomLoading";
import Datetime from "@/components/Datetime";
import { IconMessage } from "@tabler/icons-react";

type Props = {
  id: OrderType["id"];
};

function OrderViewTimeline({ id }: Props) {
  const { data, isLoading, isFetching, isRefetching } =
    useOrderTimelineQuery(id);
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Timeline</Title>
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
    </Paper>
  );
}

export default OrderViewTimeline;
