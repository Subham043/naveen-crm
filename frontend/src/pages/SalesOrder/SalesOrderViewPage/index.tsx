import CustomLoading from "@/components/CustomLoading";
import { useSalesOrderQuery } from "@/utils/data/query/sales_order";
import { Blockquote, Box, Button, Group, Title } from "@mantine/core";
import { IconArrowNarrowLeft, IconX } from "@tabler/icons-react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import SalesOrderCustomerInfo from "./SalesOrderCustomerInfo";
import SalesOrderAgentInfo from "./SalesOrderAgentInfo";
import SalesOrderPaymentInfo from "./SalesOrderPaymentInfo";
import SalesOrderYardInfo from "./SalesOrderYardInfo";
import SalesOrderLogisticInfo from "./SalesOrderLogisticInfo";
import SalesOrderEditBtn from "./SalesOrderEditBtn";
import SalesOrderSubmitForApprovalBtn from "./SalesOrderSubmitForApprovalBtn";

export default function SalesOrderView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNumber = id !== undefined && !isNaN(Number(id));

  const { data, isLoading, isFetching, isRefetching } = useSalesOrderQuery(
    Number(id),
    isNumber,
  );

  if (isLoading || isFetching || isRefetching) {
    return (
      <Box p="sm">
        <CustomLoading size="sm" color="blue" />
      </Box>
    );
  }

  if (!isNumber || !data) {
    return (
      <Blockquote color="red" icon={<IconX />} mt="xl">
        Order with id {id} not found
      </Blockquote>
    );
  }

  return (
    <Box>
      <Box p="sm" mb="md" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={3}>Order #{data.id}</Title>
          <Group gap="xs" justify="flex-end" align="center">
            <SalesOrderEditBtn is_active={data.is_active} id={data.id} />
            <SalesOrderSubmitForApprovalBtn
              is_active={data.is_active}
              id={data.id}
            />
            <Button
              leftSection={<IconArrowNarrowLeft size={16} />}
              variant="filled"
              color="dark"
              type="button"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Group>
        </Group>
      </Box>

      <SalesOrderCustomerInfo
        name={data.name}
        email={data.email}
        phone_number={data.phone_number}
        lead_source_info={data.lead_source_info}
        part_name={data.part_name}
        part_description={data.part_description}
        billing_address={data.billing_address}
        created_at={data.created_at}
        is_active={data.is_active}
        order_status={data.order_status}
        approval_by_info={data.approval_by_info}
        approval_at={data.approval_at}
      />

      <SalesOrderAgentInfo
        sales_user_info={data.sales_user_info}
        is_created_by_agent={data.is_created_by_agent}
        assigned_at={data.assigned_at}
      />

      {data.order_status > 0 && (
        <>
          <SalesOrderPaymentInfo
            total_price={data.total_price}
            cost_price={data.cost_price}
            shipping_cost={data.shipping_cost}
            sales_tax={data.sales_tax}
            gross_profit={data.gross_profit}
            payment_status_info={data.payment_status_info}
          />

          <SalesOrderYardInfo yard_located={data.yard_located} />

          <SalesOrderLogisticInfo
            tracking_details={data.tracking_details}
            invoice_status_info={data.invoice_status_info}
            shipment_status_info={data.shipment_status_info}
          />
        </>
      )}
    </Box>
  );
}
