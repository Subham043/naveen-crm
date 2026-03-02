import { Badge } from "@mantine/core";

export type PaymentCardType = 1 | 2 | 3 | 4;

interface OrderPaymentCardTypeProps {
  payment_card_type: PaymentCardType;
}

const paymentCardTypeMap = {
  1: { label: "Mastercard", color: "teal" },
  2: { label: "Visa", color: "green" },
  3: { label: "Amex", color: "blue" },
  4: { label: "Zelle", color: "cyan" },
};

function OrderPaymentCardType({
  payment_card_type,
}: OrderPaymentCardTypeProps) {
  const status = paymentCardTypeMap[payment_card_type] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderPaymentCardType;
