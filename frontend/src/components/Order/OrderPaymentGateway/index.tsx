import { Badge } from "@mantine/core";

export type PaymentGateway = 1 | 2 | 3;

interface OrderPaymentGatewayProps {
  payment_gateway: PaymentGateway;
}

const paymentGatewayMap = {
  1: { label: "Stripe", color: "yellow" },
  2: { label: "Boa", color: "green" },
  3: { label: "Zelle", color: "blue" },
};

function OrderPaymentGateway({ payment_gateway }: OrderPaymentGatewayProps) {
  const status = paymentGatewayMap[payment_gateway] ?? null;
  if (!status) {
    return null;
  }
  return <Badge color={status.color}>{status.label}</Badge>;
}

export default OrderPaymentGateway;
