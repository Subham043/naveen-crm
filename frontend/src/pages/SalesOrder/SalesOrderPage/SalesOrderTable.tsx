import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { SalesOrderType } from "@/utils/types";
import { Avatar, Box, Group, Menu, Table, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";
import SalesSubmitForApprovalBtn from "./SalesSubmitForApprovalBtn";
import SalesOrderViewBtn from "./SalesOrderViewBtn";
import OrderApprovalStatus from "@/components/Order/OrderApprovalStatus";

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
    part_year,
    part_model,
    part_name,
    lead_source_info,
    order_status,
    is_active,
    is_created_by_agent,
    approval_by_info,
    approval_at,
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
          <Group gap={7} align="flex-start">
            <Avatar
              name={name}
              color="initials"
              alt={name}
              radius="xl"
              size={30}
            />
            <Box>
              <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                {name}
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
                {email}
              </Text>
              {phone_number && (
                <Text
                  fw={500}
                  fs="italic"
                  size="xs"
                  lh={1}
                  ml={3}
                  tt="lowercase"
                  mt={5}
                >
                  {phone_number}
                </Text>
              )}
            </Box>
          </Group>
        </Table.Td>
        <Table.Td>{part_year || "N/A"}</Table.Td>
        <Table.Td>{part_model || "N/A"}</Table.Td>
        <Table.Td>{part_name || "N/A"}</Table.Td>
        <Table.Td>{lead_source_info}</Table.Td>
        <Table.Td>{is_created_by_agent ? "Yes" : "No"}</Table.Td>
        <Table.Td>
          <OrderApprovalStatus
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
              <SalesOrderViewBtn id={id} />
              <PermittedLayout
                outletType="children"
                allowedRoles={["Sales-Team"]}
                additionalCondition={!is_active}
              >
                <Menu.Item
                  leftSection={<IconEdit size={16} stroke={1.5} />}
                  onClick={onEditHandler}
                  type="button"
                >
                  Edit
                </Menu.Item>
                <SalesSubmitForApprovalBtn id={id} is_active={is_active} />
              </PermittedLayout>
            </TrippleDotMenu>
          </Group>
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
            <Table.Th>CUSTOMER</Table.Th>
            <Table.Th>PART YEAR</Table.Th>
            <Table.Th>PART MODEL</Table.Th>
            <Table.Th>PART NAME</Table.Th>
            <Table.Th>SOURCE</Table.Th>
            <Table.Th>SELF CREATED</Table.Th>
            <Table.Th>STATUS</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={10} />
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
                part_year={item.part_year}
                part_model={item.part_model}
                part_name={item.part_name}
                part_description={item.part_description}
                billing_address={item.billing_address}
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
                yards={item.yards}
                onEdit={onEdit}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={10} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SalesOrderTable;
