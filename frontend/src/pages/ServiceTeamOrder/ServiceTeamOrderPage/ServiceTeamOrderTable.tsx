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
    quotation_info,
    payment_status,
    invoice_status,
    shipment_status,
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
          {quotation_info && (
            <Group gap={7} align="flex-start">
              <Avatar
                name={quotation_info.name}
                color="initials"
                alt={quotation_info.name}
                radius="xl"
                size={30}
              />
              <Box>
                <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                  {quotation_info.name}
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
                  {quotation_info.email}
                </Text>
                {quotation_info.phone_number && (
                  <Text
                    fw={500}
                    fs="italic"
                    size="xs"
                    lh={1}
                    ml={3}
                    tt="lowercase"
                    mt={5}
                  >
                    {quotation_info.phone_number}
                  </Text>
                )}
              </Box>
            </Group>
          )}
        </Table.Td>
        <Table.Td>{quotation_info?.part_year || "N/A"}</Table.Td>
        <Table.Td>{quotation_info?.part_model || "N/A"}</Table.Td>
        <Table.Td>{quotation_info?.part_make || "N/A"}</Table.Td>
        <Table.Td>{quotation_info?.part_name || "N/A"}</Table.Td>
        <Table.Td>{quotation_info?.lead_source_info}</Table.Td>
        <Table.Td>
          {quotation_info?.sales_user_info ? (
            <Group gap={7} align="flex-start">
              <Avatar
                name={quotation_info.sales_user_info.name}
                color="initials"
                alt={quotation_info.sales_user_info.name}
                radius="xl"
                size={30}
              />
              <Box>
                <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                  {quotation_info.sales_user_info.name}
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
                  {quotation_info.sales_user_info.email}
                </Text>
                {quotation_info.sales_user_info.phone && (
                  <Text
                    fw={500}
                    fs="italic"
                    size="xs"
                    lh={1}
                    ml={3}
                    tt="lowercase"
                    mt={5}
                  >
                    {quotation_info.sales_user_info.phone}
                  </Text>
                )}
              </Box>
            </Group>
          ) : (
            "N/A"
          )}
        </Table.Td>
        <Table.Td>
          {quotation_info?.sale_price ? quotation_info.sale_price : 0.0}
        </Table.Td>
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
            <Table.Th>PART MAKE</Table.Th>
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
            <TableRowLoading colSpan={14} />
          ) : serviceTeamOrders.length > 0 ? (
            serviceTeamOrders.map((item) => (
              <ServiceTeamOrderTableRow
                key={item.id}
                id={item.id}
                quotation_info={item.quotation_info}
                quotation_id={item.quotation_id}
                payment_status={item.payment_status}
                payment_status_info={item.payment_status_info}
                payment_card_type={item.payment_card_type}
                payment_card_type_info={item.payment_card_type_info}
                payment_gateway={item.payment_gateway}
                payment_gateway_info={item.payment_gateway_info}
                transaction_id={item.transaction_id}
                yard_located={item.yard_located}
                tracking_details={item.tracking_details}
                tracking_status={item.tracking_status}
                tracking_status_info={item.tracking_status_info}
                invoice_status={item.invoice_status}
                invoice_status_info={item.invoice_status_info}
                shipment_status={item.shipment_status}
                shipment_status_info={item.shipment_status_info}
                order_status={item.order_status}
                order_status_info={item.order_status_info}
                created_at={item.created_at}
                updated_at={item.updated_at}
                yards={item.yards}
                onEdit={onEdit}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={14} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default ServiceTeamOrderTable;
