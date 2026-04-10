import CustomLoading from "@/components/CustomLoading";
import { useSalesQuotationQuery } from "@/utils/data/query/sales_quotation";
import { Blockquote, Box, Button, Group, Title } from "@mantine/core";
import { IconArrowNarrowLeft, IconX } from "@tabler/icons-react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import SalesQuotationEditBtn from "./SalesQuotationEditBtn";
import SalesQuotationSubmitForApprovalBtn from "./SalesQuotationSubmitForApprovalBtn";
import QuotationViewAgentInfo from "@/components/Quotation/QuotationView/QuotationViewAgentInfo";
import QuotationViewPriceInfo from "@/components/Quotation/QuotationView/QuotationViewPriceInfo";
import QuotationViewCustomerInfo from "@/components/Quotation/QuotationView/QuotationViewCustomerInfo";
import QuotationViewPartInfo from "@/components/Quotation/QuotationView/QuotationViewPartInfo";
import ViewTimeline from "@/components/ViewTimeline";

export default function SalesQuotationView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNumber = id !== undefined && !isNaN(Number(id));

  const { data, isLoading, isFetching, isRefetching } = useSalesQuotationQuery(
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
            <SalesQuotationEditBtn is_active={data.is_active} id={data.id} />
            <SalesQuotationSubmitForApprovalBtn
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
        part_make={data.part_make}
        part_name={data.part_name}
        part_number={data.part_number}
        part_warranty={data.part_warranty}
        part_vin={data.part_vin}
        part_description={data.part_description}
        quotation_sent={data.quotation_sent}
      />

      <QuotationViewAgentInfo
        sales_user_info={data.sales_user_info}
        is_created_by_agent={data.is_created_by_agent}
        assigned_at={data.assigned_at}
      />

      <QuotationViewPriceInfo
        sale_price={data.sale_price}
        cost_price={data.cost_price}
        shipping_cost={data.shipping_cost}
        sales_tax={data.sales_tax}
        gross_profit={data.gross_profit}
      />

      <ViewTimeline quotation_id={data.id} />
    </Box>
  );
}
