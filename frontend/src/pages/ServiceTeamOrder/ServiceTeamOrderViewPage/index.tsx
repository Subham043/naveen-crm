import CustomLoading from "@/components/CustomLoading";
import { useServiceTeamOrderQuery } from "@/utils/data/query/service_team_order";
import { Blockquote, Box, Button, Group, Title } from "@mantine/core";
import { IconArrowNarrowLeft, IconX } from "@tabler/icons-react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import ServiceTeamOrderCustomerInfo from "./ServiceTeamCustomerInfo";
import ServiceTeamOrderAgentInfo from "./ServiceTeamOrderAgentInfo";
import ServiceTeamOrderPaymentInfo from "./ServiceTeamOrderPaymentInfo";
import ServiceTeamOrderYardInfo from "./ServiceTeamYardInfo";
import ServiceTeamOrderLogisticInfo from "./ServiceTeamOrderLogisticInfo";
import ServiceTeamOrderEditBtn from "./ServiceTeamOrderEditBtn";

export default function ServiceTeamOrderView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNumber = id !== undefined && !isNaN(Number(id));

  const { data, isLoading, isFetching, isRefetching } =
    useServiceTeamOrderQuery(Number(id), isNumber);

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
            <ServiceTeamOrderEditBtn id={data.id} />
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

      <ServiceTeamOrderCustomerInfo
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

      <ServiceTeamOrderAgentInfo
        sales_user_info={data.sales_user_info}
        is_created_by_agent={data.is_created_by_agent}
        assigned_at={data.assigned_at}
      />

      {data.order_status === 1 && (
        <>
          <ServiceTeamOrderPaymentInfo
            total_price={data.total_price}
            cost_price={data.cost_price}
            shipping_cost={data.shipping_cost}
            sales_tax={data.sales_tax}
            gross_profit={data.gross_profit}
            payment_status_info={data.payment_status_info}
          />

          <ServiceTeamOrderYardInfo
            yard_located={data.yard_located}
            yards={data.yards}
          />

          <ServiceTeamOrderLogisticInfo
            tracking_details={data.tracking_details}
            invoice_status_info={data.invoice_status_info}
            shipment_status_info={data.shipment_status_info}
          />
        </>
      )}
    </Box>
  );
}
