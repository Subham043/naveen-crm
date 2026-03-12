import TableRowNotFound from "@/components/TableRowNotFound";
import type { OrderUpdateFormValuesType } from "@/utils/data/schema/order";
import {
  Switch,
  Paper,
  Box,
  Group,
  Title,
  Input,
  ActionIcon,
  Divider,
  Table,
  Textarea,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { memo } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

function YardFormSection() {
  const { control, formState } = useFormContext<OrderUpdateFormValuesType>();

  const yardLocated = useWatch({
    control: control,
    name: "yard_located",
  });

  const { fields: yards, insert: yardsInsert } = useFieldArray({
    control: control,
    name: "yards",
  });

  return (
    <>
      <Controller
        name="yard_located"
        control={control}
        render={({ field, fieldState }) => (
          <Switch
            label="Is Yard Located?"
            checked={field.value === 1}
            onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
            error={fieldState.error?.message}
            mt="md"
          />
        )}
      />
      {yardLocated === 1 && (
        <Paper shadow="xs" withBorder mt="md">
          <Box p="sm" pos="relative" bg={"var(--mantine-color-cyan-light)"}>
            <Group justify="space-between" gap={10}>
              <Box>
                <Title order={5}>Yard Information</Title>
                {formState.errors.yards?.message && (
                  <Input.Error>{formState.errors.yards?.message}</Input.Error>
                )}
              </Box>
              <ActionIcon
                variant="filled"
                color="cyan"
                onClick={() =>
                  yardsInsert(yards.length, { yard: "", id: undefined })
                }
              >
                <IconPlus
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Box>
          <Divider />
          <Box>
            <Table horizontalSpacing="sm">
              <Table.Tbody>
                {yards.length > 0 ? (
                  yards.map((_, index) => (
                    <Table.Tr key={index} bg={"#c7c7c71a"}>
                      <Table.Td w="5px">{index + 1}.</Table.Td>
                      <Table.Td>
                        <Controller
                          name={`yards.${index}.yard`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <Textarea
                              placeholder={`Yard ${index + 1}`}
                              value={field.value ? field.value : ""}
                              onChange={field.onChange}
                              error={fieldState.error?.message}
                              withAsterisk
                              rows={3}
                            />
                          )}
                        />
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <TableRowNotFound
                    colSpan={2}
                    message="No yard found. Please click on plus icon to add yard"
                  />
                )}
              </Table.Tbody>
            </Table>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default memo(YardFormSection);
