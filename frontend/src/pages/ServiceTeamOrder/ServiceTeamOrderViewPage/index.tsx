import CustomLoading from "@/components/CustomLoading";
import { useServiceTeamOrderQuery } from "@/utils/data/query/service_team_order";
import { Blockquote, Box, Button, Group, Title } from "@mantine/core";
import { IconArrowNarrowLeft, IconX } from "@tabler/icons-react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import ServiceTeamOrderEditBtn from "./ServiceTeamOrderEditBtn";
import OrderViewLogisticInfo from "@/components/Order/OrderView/OrderViewLogisticInfo";
import OrderViewYardInfo from "@/components/Order/OrderView/OrderViewYardInfo";
import OrderViewPaymentInfo from "@/components/Order/OrderView/OrderViewPaymentInfo";
import OrderViewAgentInfo from "@/components/Order/OrderView/OrderViewAgentInfo";
import OrderViewCustomerInfo from "@/components/Order/OrderView/OrderViewCustomerInfo";
import OrderViewPartInfo from "@/components/Order/OrderView/OrderViewPartInfo";
import OrderViewPriceInfo from "@/components/Order/OrderView/OrderViewPriceInfo";
import OrderViewStatusInfo from "@/components/Order/OrderView/OrderViewStatusInfo";
import ViewTimeline from "@/components/ViewTimeline";
import ServiceTeamOrderViewPdfExportBtn from "./ServiceTeamOrderViewPdfExportBtn";

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
        Order with id #WAM{id} not found
      </Blockquote>
    );
  }

  return (
    <Box>
      <Box p="sm" mb="md" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={3}>Order #WAM{data.id}</Title>
          <Group gap="xs" justify="flex-end" align="center">
            <ServiceTeamOrderEditBtn id={data.id} />
            <ServiceTeamOrderViewPdfExportBtn order_id={data.id} />
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

      <OrderViewCustomerInfo
        quotation_info={data.quotation_info}
        created_at={data.created_at}
      />

      <OrderViewPartInfo quotation_info={data.quotation_info} />

      <OrderViewAgentInfo quotation_info={data.quotation_info} />

      <OrderViewPriceInfo quotation_info={data.quotation_info} />

      <OrderViewPaymentInfo
        payment_status={data.payment_status}
        payment_card_type={data.payment_card_type}
        payment_gateway={data.payment_gateway}
        transaction_id={data.transaction_id}
      />

      <OrderViewYardInfo yard_located={data.yard_located} yards={data.yards} />

      <OrderViewLogisticInfo
        tracking_details={data.tracking_details}
        tracking_status={data.tracking_status}
      />

      <OrderViewStatusInfo
        invoice_status={data.invoice_status}
        po_status={data.po_status}
        order_status={data.order_status}
      />

      {data.quotation_id && <ViewTimeline quotation_id={data.quotation_id} />}
    </Box>
  );
}
