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
  Button,
} from "@mantine/core";
import type { QuotationType } from "@/utils/types";
import { useTimelineQuery } from "@/utils/data/query/timeline";
import CustomLoading from "@/components/CustomLoading";
import Datetime from "@/components/Datetime";
import { IconMessage, IconRefresh } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import PermittedLayout from "@/layouts/PermittedLayout";
import SearchField from "../SearchField";
import { useDebouncedCallback } from "@mantine/hooks";
import CommonDateFilter from "@/components/CommonReportFilter/CommonDateFilter";

type Props = {
  quotation_id: QuotationType["id"];
};

function ViewTimeline({ quotation_id }: Props) {
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const { data, isLoading, isFetching, isRefetching, refetch } =
    useTimelineQuery(quotation_id, {
      page,
      total,
      search,
      from_date: fromDate,
      to_date: toDate,
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

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const onClear = useCallback(() => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setPage(1);
  }, []);

  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={5}>Timeline</Title>
          <PermittedLayout
            outletType="children"
            allowedRoles={["Super-Admin", "Service-Team", "Sales-Team"]}
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
        {/* Filters */}
        <Group gap="xs">
          <SearchField
            defaultValue={search}
            onChange={(e) => debouncedSetSearch(e.currentTarget.value)}
            key={search}
          />
          <Box w="170px">
            <CommonDateFilter
              label="From Date"
              date={fromDate}
              setDate={(date) => setFromDate(date ? date : "")}
            />
          </Box>
          <Box w="170px">
            <CommonDateFilter
              label="To Date"
              date={toDate}
              setDate={(date) => setToDate(date ? date : "")}
            />
          </Box>
          <Button variant="filled" type="button" color="dark" onClick={onClear}>
            CLEAR
          </Button>
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
                    color={
                      item.done_by.role === "Sales-Team" ? "orange" : "blue"
                    }
                    title={`${item.done_by.name} (${item.done_by.role})`}
                    icon={<IconMessage />}
                    w="fit-content"
                    p="xs"
                    mt={4}
                  >
                    <i>{item.comment}</i>
                    {item.additional_comment && (
                      <>
                        <br />
                        <i>{item.additional_comment}</i>
                      </>
                    )}
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

export default ViewTimeline;
