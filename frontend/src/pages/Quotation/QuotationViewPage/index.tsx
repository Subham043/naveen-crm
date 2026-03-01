import CustomLoading from "@/components/CustomLoading";
import { useQuotationQuery } from "@/utils/data/query/quotation";
import { Blockquote, Box, Button, Group, Title } from "@mantine/core";
import { IconArrowNarrowLeft, IconX } from "@tabler/icons-react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import QuotationViewApprovalBtn from "./QuotationViewApprovalBtn";
import QuotationViewCustomerInfo from "@/components/Quotation/QuotationView/QuotationViewCustomerInfo";
import QuotationViewPartInfo from "@/components/Quotation/QuotationView/QuotationViewPartInfo";
import QuotationViewAgentInfo from "@/components/Quotation/QuotationView/QuotationViewAgentInfo";
import QuotationViewPaymentInfo from "@/components/Quotation/QuotationView/QuotationViewPaymentInfo";
import QuotationViewTimeline from "./QuotationViewTimeline";

export default function QuotationView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNumber = id !== undefined && !isNaN(Number(id));

  const { data, isLoading, isFetching, isRefetching } = useQuotationQuery(
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
        Quotation with id {id} not found
      </Blockquote>
    );
  }

  return (
    <Box>
      <Box p="sm" mb="md" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={3}>Quotation #{data.id}</Title>
          <Group gap="xs" justify="flex-end" align="center">
            <QuotationViewApprovalBtn
              is_active={data.is_active}
              id={data.id}
              quotation_status={data.quotation_status as 0 | 1 | 2}
              update_quotation_status={1}
            />
            <QuotationViewApprovalBtn
              is_active={data.is_active}
              id={data.id}
              quotation_status={data.quotation_status as 0 | 1 | 2}
              update_quotation_status={2}
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

      <QuotationViewCustomerInfo
        name={data.name}
        email={data.email}
        phone_number={data.phone_number}
        lead_source_info={data.lead_source_info}
        billing_address={data.billing_address}
        shipping_address={data.shipping_address}
        created_at={data.created_at}
        is_active={data.is_active}
        quotation_status={data.quotation_status}
        approval_by_info={data.approval_by_info}
        approval_at={data.approval_at}
      />

      <QuotationViewPartInfo
        part_year={data.part_year}
        part_model={data.part_model}
        part_name={data.part_name}
        part_make={data.part_make}
        part_description={data.part_description}
        quotation_sent={data.quotation_sent}
      />

      <QuotationViewAgentInfo
        sales_user_info={data.sales_user_info}
        is_created_by_agent={data.is_created_by_agent}
        assigned_at={data.assigned_at}
      />

      <QuotationViewPaymentInfo
        sale_price={data.sale_price}
        cost_price={data.cost_price}
        shipping_cost={data.shipping_cost}
        sales_tax={data.sales_tax}
        gross_profit={data.gross_profit}
      />

      <QuotationViewTimeline id={data.id} />
    </Box>
  );
}
