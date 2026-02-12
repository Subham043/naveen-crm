import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { ServiceTeamOrderType } from "@/utils/types";
import { Avatar, Box, Group, Menu, Table, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";
import ServiceTeamOrderViewBtn from "./ServiceTeamOrderViewBtn";
import OrderShipmentStatus, {
  type ShipmentStatus,
} from "@/components/Order/OrderShipmentStatus";
import type { PaymentStatus } from "@/components/Order/OrderPaymentStatus";
import OrderPaymentStatus from "@/components/Order/OrderPaymentStatus";
import type { InvoiceStatus } from "@/components/Order/OrderInvoiceStatus";
import OrderInvoiceStatus from "@/components/Order/OrderInvoiceStatus";

type ServiceTeamOrderTableProps = {
  serviceTeamOrders: ServiceTeamOrderType[];
  loading: boolean;
  onEdit: (id: number) => void;
};

const ServiceTeamOrderTableRow = memo(
  ({
    id,
    name,
    email,
    phone_number,
    part_year,
    part_model,
    part_name,
    lead_source_info,
    payment_status,
    invoice_status,
    shipment_status,
    is_active,
    sales_user_info,
    total_price,
    created_at,
    onEdit,
  }: ServiceTeamOrderType & {
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
        <Table.Td>
          {sales_user_info ? (
            <Group gap={7} align="flex-start">
              <Avatar
                name={sales_user_info.name}
                color="initials"
                alt={sales_user_info.name}
                radius="xl"
                size={30}
              />
              <Box>
                <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                  {sales_user_info.name}
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
                  {sales_user_info.email}
                </Text>
                {sales_user_info.phone && (
                  <Text
                    fw={500}
                    fs="italic"
                    size="xs"
                    lh={1}
                    ml={3}
                    tt="lowercase"
                    mt={5}
                  >
                    {sales_user_info.phone}
                  </Text>
                )}
              </Box>
            </Group>
          ) : (
            "N/A"
          )}
        </Table.Td>
        <Table.Td>{total_price ? total_price : 0.0}</Table.Td>
        <Table.Td>
          <OrderPaymentStatus
            payment_status={payment_status as PaymentStatus}
          />
        </Table.Td>
        <Table.Td>
          <OrderInvoiceStatus
            invoice_status={invoice_status as InvoiceStatus}
          />
        </Table.Td>
        <Table.Td>
          <OrderShipmentStatus
            shipment_status={shipment_status as ShipmentStatus}
          />
        </Table.Td>
        <Table.Td>
          <Datetime value={created_at} />
        </Table.Td>
        <Table.Td>
          <Group justify="end" gap="xs">
            <TrippleDotMenu width={200}>
              <ServiceTeamOrderViewBtn id={id} />
              <PermittedLayout
                outletType="children"
                allowedRoles={["Service-Team"]}
                additionalCondition={is_active}
              >
                <Menu.Item
                  leftSection={<IconEdit size={16} stroke={1.5} />}
                  onClick={onEditHandler}
                  type="button"
                >
                  Edit
                </Menu.Item>
              </PermittedLayout>
            </TrippleDotMenu>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function ServiceTeamOrderTable({
  loading,
  serviceTeamOrders,
  onEdit,
}: ServiceTeamOrderTableProps) {
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
            <Table.Th>AGENT</Table.Th>
            <Table.Th>TOTAL PRICE</Table.Th>
            <Table.Th>PAYMENT</Table.Th>
            <Table.Th>INVOICE</Table.Th>
            <Table.Th>SHIPMENT</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={13} />
          ) : serviceTeamOrders.length > 0 ? (
            serviceTeamOrders.map((item) => (
              <ServiceTeamOrderTableRow
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
                yards={item.yards}
                is_active={item.is_active}
                created_at={item.created_at}
                updated_at={item.updated_at}
                onEdit={onEdit}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={13} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default ServiceTeamOrderTable;
