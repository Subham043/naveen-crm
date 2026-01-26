import { Box, Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import type { OrderType } from "@/utils/types";

type Props = {
  yard_located: OrderType["yard_located"];
  yards: OrderType["yards"];
};

function OrderViewYardInfo({ yard_located, yards }: Props) {
  if (!yard_located || yards.length === 0) return null;

  return (
    <Paper shadow="xs" mb="lg" withBorder>
      <Box p="sm" pos="relative">
        <Title order={5}>Yard Info</Title>
      </Box>
      <Divider />
      <Box p="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {yards.map((yard, index) => (
            <Box key={yard.id}>
              <Text fw={600} c="blue">
                Yard Detail {index + 1}
              </Text>
              <Text size="sm" c="dimmed">
                {yard.yard}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default OrderViewYardInfo;
