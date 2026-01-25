import { Box, Divider, Paper, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";

type Props = {
  yard_located: OrderType["yard_located"];
};

function OrderYardInfo({ yard_located }: Props) {
  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Yard Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <Box>
          <Text fw={600} c="blue">
            Is Yard Located
          </Text>
          <Text size="sm" c="dimmed">
            {yard_located ? "Yes" : "No"}
          </Text>
        </Box>
      </Box>
    </Paper>
  );
}

export default OrderYardInfo;
