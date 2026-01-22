import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { SalesOrderType } from "@/utils/types";
import { Avatar, Badge, Group, Menu, Table, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";

type SalesOrderTableProps = {
  salesOrders: SalesOrderType[];
  loading: boolean;
  onEdit: (id: number) => void;
};

const SalesOrderTableRow = memo(
  ({
    id,
    name,
    email,
    phone_number,
    lead_source_info,
    order_status_info,
    is_active,
    created_at,
    onEdit,
  }: SalesOrderType & {
    onEdit: (id: number) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td>{id}</Table.Td>
        <Table.Td>
          <Group gap={7}>
            <Avatar
              name={name}
              color="initials"
              alt={name}
              radius="xl"
              size={30}
            />
            <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
              {name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td tt="lowercase">{email}</Table.Td>
        <Table.Td>{phone_number}</Table.Td>
        <Table.Td>{lead_source_info}</Table.Td>
        <Table.Td>{order_status_info}</Table.Td>
        <Table.Td>
          {is_active ? (
            <Badge size="sm" color="red">
              No
            </Badge>
          ) : (
            <Badge size="sm" color="green">
              Yes
            </Badge>
          )}
        </Table.Td>
        <Table.Td>
          <Datetime value={created_at} />
        </Table.Td>
        <Table.Td>
          <PermittedLayout
            outletType="children"
            allowedRoles={["Sales-Team"]}
            additionalCondition={!is_active}
          >
            <Group justify="end" gap="xs">
              <TrippleDotMenu width={170}>
                <Menu.Item
                  leftSection={<IconEdit size={16} stroke={1.5} />}
                  onClick={onEditHandler}
                >
                  Edit
                </Menu.Item>
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function SalesOrderTable({
  loading,
  salesOrders,
  onEdit,
}: SalesOrderTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>ID</Table.Th>
            <Table.Th>NAME</Table.Th>
            <Table.Th>EMAIL</Table.Th>
            <Table.Th>PHONE</Table.Th>
            <Table.Th>SOURCE</Table.Th>
            <Table.Th>STATUS</Table.Th>
            <Table.Th>DRAFT</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={8} />
          ) : salesOrders.length > 0 ? (
            salesOrders.map((item) => (
              <SalesOrderTableRow
                key={item.id}
                id={item.id}
                name={item.name}
                email={item.email}
                phone={item.phone}
                country_code={item.country_code}
                phone_number={item.phone_number}
                lead_source={item.lead_source}
                lead_source_info={item.lead_source_info}
                sales_user_id={item.sales_user_id}
                is_created_by_agent={item.is_created_by_agent}
                assigned_at={item.assigned_at}
                order_status={item.order_status}
                order_status_info={item.order_status_info}
                approval_by_id={item.approval_by_id}
                approval_at={item.approval_at}
                is_active={item.is_active}
                created_at={item.created_at}
                updated_at={item.updated_at}
                onEdit={onEdit}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={8} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SalesOrderTable;
