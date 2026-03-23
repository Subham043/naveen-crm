import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { QuotationType } from "@/utils/types";
import { Avatar, Box, Group, Menu, Table, Text } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";
import QuotationViewBtn from "./QuotationViewBtn";
import QuotationApprovalBtn from "./QuotationApprovalBtn";
import QuotationApprovalStatus from "@/components/Quotation/QuotationApprovalStatus";
import { IconEdit } from "@tabler/icons-react";

type QuotationTableProps = {
  quotations: QuotationType[];
  loading: boolean;
  onEdit: (id: number) => void;
};

const QuotationTableRow = memo(
  ({
    id,
    name,
    email,
    phone_number,
    part_year,
    part_model,
    part_name,
    part_number,
    part_make,
    lead_source_info,
    quotation_status,
    is_active,
    sales_user_info,
    approval_by_info,
    sale_price,
    approval_at,
    created_at,
    onEdit,
  }: QuotationType & {
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
        <Table.Td>{part_make || "N/A"}</Table.Td>
        <Table.Td>{part_model || "N/A"}</Table.Td>
        <Table.Td>{part_name || "N/A"}</Table.Td>
        <Table.Td>{part_number || "N/A"}</Table.Td>
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
        <Table.Td>{sale_price ? sale_price : 0.0}</Table.Td>
        <Table.Td>
          <QuotationApprovalStatus
            is_active={is_active}
            quotation_status={quotation_status}
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
              <QuotationViewBtn id={id} />
              <PermittedLayout
                outletType="children"
                allowedRoles={["Super-Admin"]}
                additionalCondition={is_active && quotation_status === 0}
              >
                <QuotationApprovalBtn
                  id={id}
                  is_active={is_active}
                  quotation_status={quotation_status as 0 | 1 | 2}
                  update_quotation_status={1}
                />
                <QuotationApprovalBtn
                  id={id}
                  is_active={is_active}
                  quotation_status={quotation_status as 0 | 1 | 2}
                  update_quotation_status={2}
                />
              </PermittedLayout>
              <PermittedLayout
                outletType="children"
                allowedRoles={["Super-Admin"]}
                additionalCondition={quotation_status === 1}
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

function QuotationTable({ loading, quotations, onEdit }: QuotationTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>ID</Table.Th>
            <Table.Th>CUSTOMER</Table.Th>
            <Table.Th>YEAR</Table.Th>
            <Table.Th>MAKE</Table.Th>
            <Table.Th>MODEL</Table.Th>
            <Table.Th>NAME</Table.Th>
            <Table.Th>NUMBER</Table.Th>
            <Table.Th>SOURCE</Table.Th>
            <Table.Th>AGENT</Table.Th>
            <Table.Th>SALE PRICE</Table.Th>
            <Table.Th>STATUS</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={13} />
          ) : quotations.length > 0 ? (
            quotations.map((item) => (
              <QuotationTableRow
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
                part_number={item.part_number}
                part_description={item.part_description}
                billing_address={item.billing_address}
                lead_source={item.lead_source}
                lead_source_info={item.lead_source_info}
                sales_user_id={item.sales_user_id}
                sales_user_info={item.sales_user_info}
                is_created_by_agent={item.is_created_by_agent}
                assigned_at={item.assigned_at}
                sale_price={item.sale_price}
                cost_price={item.cost_price}
                shipping_cost={item.shipping_cost}
                sales_tax={item.sales_tax}
                gross_profit={item.gross_profit}
                quotation_status={item.quotation_status}
                quotation_status_info={item.quotation_status_info}
                approval_by_id={item.approval_by_id}
                approval_by_info={item.approval_by_info}
                approval_at={item.approval_at}
                is_active={item.is_active}
                created_at={item.created_at}
                updated_at={item.updated_at}
                quotation_sent={item.quotation_sent}
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

export default QuotationTable;
