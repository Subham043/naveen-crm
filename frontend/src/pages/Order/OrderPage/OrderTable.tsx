import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { OrderType } from "@/utils/types";
import { Avatar, Group, Table, Text } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import Datetime from "@/components/Datetime";
import { memo } from "react";
import OrderViewBtn from "./OrderViewBtn";
import OrderStatus from "../OrderViewPage/OrderStatus";
import OrderApprovalBtn from "./OrderApprovalBtn";

type OrderTableProps = {
  orders: OrderType[];
  loading: boolean;
};

const OrderTableRow = memo(
  ({
    id,
    name,
    email,
    phone_number,
    lead_source_info,
    order_status,
    is_active,
    approval_by_info,
    approval_at,
    created_at,
  }: OrderType) => {
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
        <Table.Td>
          <OrderStatus
            is_active={is_active}
            order_status={order_status}
            approval_by_info={approval_by_info}
            approval_at={approval_at}
          />
        </Table.Td>
        <Table.Td>
          <Datetime value={created_at} />
        </Table.Td>
        <Table.Td>
          <Group justify="end" gap="xs">
            <TrippleDotMenu width={200}>
              <OrderViewBtn id={id} />
              <PermittedLayout
                outletType="children"
                allowedRoles={["Super-Admin"]}
                additionalCondition={is_active && order_status === 0}
              >
                <OrderApprovalBtn
                  id={id}
                  is_active={is_active}
                  order_status={order_status as 0 | 1 | 2}
                  update_order_status={1}
                />
                <OrderApprovalBtn
                  id={id}
                  is_active={is_active}
                  order_status={order_status as 0 | 1 | 2}
                  update_order_status={2}
                />
              </PermittedLayout>
            </TrippleDotMenu>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function OrderTable({ loading, orders }: OrderTableProps) {
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
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={7} />
          ) : orders.length > 0 ? (
            orders.map((item) => (
              <OrderTableRow
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
                sales_user_info={item.sales_user_info}
                is_created_by_agent={item.is_created_by_agent}
                assigned_at={item.assigned_at}
                payment_status={item.payment_status}
                payment_status_info={item.payment_status_info}
                yard_located={item.yard_located}
                total_price={item.total_price}
                cost_price={item.cost_price}
                shipping_cost={item.shipping_cost}
                sales_tax={item.sales_tax}
                gross_profit={item.gross_profit}
                tracking_details={item.tracking_details}
                invoice_status={item.invoice_status}
                invoice_status_info={item.invoice_status_info}
                shipment_status={item.shipment_status}
                shipment_status_info={item.shipment_status_info}
                order_status={item.order_status}
                order_status_info={item.order_status_info}
                approval_by_id={item.approval_by_id}
                approval_by_info={item.approval_by_info}
                approval_at={item.approval_at}
                is_active={item.is_active}
                created_at={item.created_at}
                updated_at={item.updated_at}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={7} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default OrderTable;
