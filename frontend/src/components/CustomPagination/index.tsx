import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { Box, Divider, Group, Pagination, Select } from "@mantine/core";
import { memo, useCallback, useMemo } from "react";

const CustomPagination = memo(({ totalCount }: { totalCount: number }) => {
  const { page, setPage, total, setTotal } = usePaginationQueryParam();

  const onLimitChange = useCallback(
    (value: string | null) => {
      setTotal(value ? Number(value) : 10);
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
    return Math.ceil(totalCount / Number(total));
  }, [totalCount, total]);

  return (
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
  );
});

export default CustomPagination;
