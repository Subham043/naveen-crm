import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getDashboardHandler } from "../dal/dashboard";
import { useAuthStore } from "@/stores/auth.store";
import {
    IconAlignBoxLeftStretch,
    IconAppWindow,
    IconBasketStar,
    IconBrandCashapp,
    IconCancel,
    IconCashMoveBack,
    IconCashRegister,
    IconChecks,
    IconCircleCheck,
    IconCircleDashedCheck,
    IconCreditCard,
    IconCreditCardPay,
    IconCubeSend,
    IconFileSpreadsheet,
    IconHelpOctagon,
    IconInvoice,
    IconLetterB,
    IconLetterS,
    IconLetterZ,
    IconLoader,
    IconLocationUp,
    IconNotesOff,
    IconPackageImport,
    IconPhoneCalling,
    IconPinInvoke,
    IconReceipt,
    IconReceipt2,
    IconShoppingCartDollar,
    IconTagStarred,
    IconX,
    IconXboxX,
    IconZoomExclamation,
    type IconProps,
} from "@tabler/icons-react";

export const DashboardQueryKey = (token: string | null) => {
    return ["dashboard", token];
};

const TotalQuotations = "totalQuotations";
const TotalWebsiteLeadQuotations = "totalWebsiteLeadQuotations";
const TotalCallQuotations = "totalCallQuotations";
const TotalDraftQuotations = "totalDraftQuotations";
const TotalApprovalPendingQuotations = "totalApprovalPendingQuotations";
const TotalApprovedQuotations = "totalApprovedQuotations";
const TotalRejectedQuotations = "totalRejectedQuotations";

const TotalOrders = "totalOrders";
const TotalWebsiteLeadOrders = "totalWebsiteLeadOrders";
const TotalCallOrders = "totalCallOrders";

const SalePrice = "salePrice";
const CostPrice = "costPrice";
const ShippingCost = "shippingCost";
const TotalSalesTax = "totalSalesTax";
const TotalGrossProfit = "totalGrossProfit";

const TotalPaymentPendingOrders = "totalPaymentPendingOrders";
const TotalPaymentPaidOrders = "totalPaymentPaidOrders";
const TotalPaymentPartiallyPaidOrders = "totalPaymentPartiallyPaidOrders";

const TotalPaymentMastercardOrders = "totalPaymentMastercardOrders";
const TotalPaymentVisaOrders = "totalPaymentVisacardOrders";
const TotalPaymentAmexOrders = "totalPaymentAmexcardOrders";
const TotalPaymentZellecardOrders = "totalPaymentZellecardOrders";

const TotalPaymentStripeOrders = "totalPaymentStripeOrders";
const TotalPaymentBoaOrders = "totalPaymentBoaOrders";
const TotalPaymentZelleOrders = "totalPaymentZelleOrders";

const TotalInvoiceNotGeneratedOrders = "totalInvoiceNotGeneratedOrders";
const TotalInvoiceGeneratedOrders = "totalInvoiceGeneratedOrders";
const TotalInvoiceSentOrders = "totalInvoiceSentOrders";

const TotalShipmentPOPendingOrders = "totalShipmentPOPendingOrders";
const TotalShipmentPOSentOrders = "totalShipmentPOSentOrders";

const TotalTrackingPendingOrders = "totalTrackingPendingOrders";
const TotalTrackingSentOrders = "totalTrackingSentOrders";

const TotalPendingOrders = "totalPendingOrders";
const TotalEscalationOrders = "totalEscalationOrders";
const TotalCancelledOrders = "totalCancelledOrders";
const TotalRelocatePoSentOrders = "totalRelocatePoSentOrders";
const TotalPendingForRefundOrders = "totalPendingForRefundOrders";
const TotalRefundedOrders = "totalRefundedOrders";
const TotalPendingPartShippedOrders = "totalPendingPartShippedOrders";
const TotalCompletedOrders = "totalCompletedOrders";
const TotalChargeBackOrders = "totalChargeBackOrders";
const TotalYardRelocateOrders = "totalYardRelocateOrders";

const TotalApprovedByMeOrders = "totalApprovedByMeOrders";
const TotalRejectedByMeOrders = "totalRejectedByMeOrders";

const QuotationLeadSourceGraphContent = [
    TotalWebsiteLeadQuotations,
    TotalCallQuotations,
];

const QuotationStatusGraphContent = [
    TotalDraftQuotations,
    TotalApprovalPendingQuotations,
    TotalApprovedQuotations,
    TotalRejectedQuotations,
];

const OrderLeadSourceGraphContent = [TotalWebsiteLeadOrders, TotalCallOrders];

const OrderPaymentStatusGraphContent = [
    TotalPaymentPendingOrders,
    TotalPaymentPaidOrders,
    TotalPaymentPartiallyPaidOrders,
];

const OrderPaymentCardTypeGraphContent = [
    TotalPaymentMastercardOrders,
    TotalPaymentVisaOrders,
    TotalPaymentAmexOrders,
    TotalPaymentZellecardOrders,
];

const OrderPaymentGatewayGraphContent = [
    TotalPaymentStripeOrders,
    TotalPaymentBoaOrders,
    TotalPaymentZelleOrders,
];

const OrderInvoiceStatusGraphContent = [
    TotalInvoiceNotGeneratedOrders,
    TotalInvoiceGeneratedOrders,
    TotalInvoiceSentOrders,
];

const OrderShipmentStatusGraphContent = [
    TotalShipmentPOPendingOrders,
    TotalShipmentPOSentOrders,
];

const OrderTrackingStatusGraphContent = [
    TotalTrackingPendingOrders,
    TotalTrackingSentOrders,
];

const OrderStatusGraphContent = [
    TotalPendingOrders,
    TotalEscalationOrders,
    TotalCancelledOrders,
    TotalRelocatePoSentOrders,
    TotalPendingForRefundOrders,
    TotalRefundedOrders,
    TotalPendingPartShippedOrders,
    TotalCompletedOrders,
    TotalChargeBackOrders,
    TotalYardRelocateOrders,
];

const OrderApprovalStatusGraphContent = [
    TotalApprovedByMeOrders,
    TotalRejectedByMeOrders,
];

const OrderFinancialGraphContent = [
    SalePrice,
    CostPrice,
    ShippingCost,
    TotalSalesTax,
    TotalGrossProfit,
];

const dashboardKeyIconMap = {
    [TotalQuotations]: {
        Icon: IconFileSpreadsheet,
        color: "var(--mantine-color-blue-filled)",
    },
    [TotalWebsiteLeadQuotations]: {
        Icon: IconAppWindow,
        color: "var(--mantine-color-green-filled)",
    },
    [TotalCallQuotations]: {
        Icon: IconPhoneCalling,
        color: "var(--mantine-color-indigo-filled)",
    },
    [TotalDraftQuotations]: {
        Icon: IconNotesOff,
        color: "var(--mantine-color-gray-filled)",
    },
    [TotalApprovalPendingQuotations]: {
        Icon: IconCircleDashedCheck,
        color: "var(--mantine-color-yellow-filled)",
    },
    [TotalApprovedQuotations]: {
        Icon: IconCircleCheck,
        color: "var(--mantine-color-green-filled)",
    },
    [TotalRejectedQuotations]: {
        Icon: IconXboxX,
        color: "var(--mantine-color-red-filled)",
    },
    [TotalOrders]: {
        Icon: IconFileSpreadsheet,
        color: "var(--mantine-color-blue-filled)",
    },
    [TotalWebsiteLeadOrders]: {
        Icon: IconAppWindow,
        color: "var(--mantine-color-green-filled)",
    },
    [TotalCallOrders]: {
        Icon: IconPhoneCalling,
        color: "var(--mantine-color-indigo-filled)",
    },
    [SalePrice]: {
        Icon: IconReceipt2,
        color: "var(--mantine-color-teal-filled)",
    },
    [CostPrice]: {
        Icon: IconTagStarred,
        color: "var(--mantine-color-indigo-filled)",
    },
    [ShippingCost]: {
        Icon: IconShoppingCartDollar,
        color: "var(--mantine-color-orange-filled)",
    },
    [TotalSalesTax]: {
        Icon: IconReceipt,
        color: "var(--mantine-color-cyan-filled)",
    },
    [TotalGrossProfit]: {
        Icon: IconBasketStar,
        color: "var(--mantine-color-green-filled)",
    },
    [TotalPaymentPendingOrders]: {
        Icon: IconCashMoveBack,
        color: "var(--mantine-color-red-filled)",
    },
    [TotalPaymentPaidOrders]: {
        Icon: IconBrandCashapp,
        color: "var(--mantine-color-teal-filled)",
    },
    [TotalPaymentPartiallyPaidOrders]: {
        Icon: IconCreditCardPay,
        color: "var(--mantine-color-orange-filled)",
    },
    [TotalPaymentMastercardOrders]: {
        Icon: IconCreditCard,
        color: "var(--mantine-color-blue-filled)",
    },
    [TotalPaymentVisaOrders]: {
        Icon: IconCreditCard,
        color: "var(--mantine-color-green-filled)",
    },
    [TotalPaymentAmexOrders]: {
        Icon: IconCreditCard,
        color: "var(--mantine-color-indigo-filled)",
    },
    [TotalPaymentZellecardOrders]: {
        Icon: IconCreditCard,
        color: "var(--mantine-color-yellow-filled)",
    },
    [TotalPaymentStripeOrders]: {
        Icon: IconLetterS,
        color: "var(--mantine-color-violet-filled)",
    },
    [TotalPaymentBoaOrders]: {
        Icon: IconLetterB,
        color: "var(--mantine-color-orange-filled)",
    },
    [TotalPaymentZelleOrders]: {
        Icon: IconLetterZ,
        color: "var(--mantine-color-teal-filled)",
    },
    [TotalInvoiceNotGeneratedOrders]: {
        Icon: IconAlignBoxLeftStretch,
        color: "var(--mantine-color-gray-filled)",
    },
    [TotalInvoiceGeneratedOrders]: {
        Icon: IconInvoice,
        color: "var(--mantine-color-violet-filled)",
    },
    [TotalInvoiceSentOrders]: {
        Icon: IconPinInvoke,
        color: "var(--mantine-color-teal-filled)",
    },
    [TotalShipmentPOPendingOrders]: {
        Icon: IconLoader,
        color: "var(--mantine-color-gray-filled)",
    },
    [TotalShipmentPOSentOrders]: {
        Icon: IconCubeSend,
        color: "var(--mantine-color-pink-filled)",
    },
    [TotalTrackingPendingOrders]: {
        Icon: IconLoader,
        color: "var(--mantine-color-gray-filled)",
    },
    [TotalTrackingSentOrders]: {
        Icon: IconCubeSend,
        color: "var(--mantine-color-grape-filled)",
    },
    [TotalPendingOrders]: {
        Icon: IconLoader,
        color: "var(--mantine-color-gray-filled)",
    },
    [TotalEscalationOrders]: {
        Icon: IconZoomExclamation,
        color: "var(--mantine-color-orange-filled)",
    },
    [TotalCancelledOrders]: {
        Icon: IconCancel,
        color: "var(--mantine-color-red-filled)",
    },
    [TotalRelocatePoSentOrders]: {
        Icon: IconLocationUp,
        color: "var(--mantine-color-blue-filled)",
    },
    [TotalPendingForRefundOrders]: {
        Icon: IconCashMoveBack,
        color: "var(--mantine-color-yellow-filled)",
    },
    [TotalRefundedOrders]: {
        Icon: IconCashMoveBack,
        color: "var(--mantine-color-indigo-filled)",
    },
    [TotalPendingPartShippedOrders]: {
        Icon: IconPackageImport,
        color: "var(--mantine-color-cyan-filled)",
    },
    [TotalCompletedOrders]: {
        Icon: IconCubeSend,
        color: "var(--mantine-color-green-filled)",
    },
    [TotalChargeBackOrders]: {
        Icon: IconCashRegister,
        color: "var(--mantine-color-dark-filled)",
    },
    [TotalYardRelocateOrders]: {
        Icon: IconLocationUp,
        color: "var(--mantine-color-grape-filled)",
    },
    [TotalApprovedByMeOrders]: {
        Icon: IconChecks,
        color: "var(--mantine-color-teal-filled)",
    },
    [TotalRejectedByMeOrders]: {
        Icon: IconX,
        color: "var(--mantine-color-orange-filled)",
    },
};

export const DashboardQueryFn = async ({
    signal,
}: {
    signal?: AbortSignal;
}) => {
    const resp = await getDashboardHandler(signal);
    const quotationLeadSourceGraphContent = Object.entries(resp)
        .filter(([key]) => QuotationLeadSourceGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const quotationStatusGraphContent = Object.entries(resp)
        .filter(([key]) => QuotationStatusGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderLeadSourceGraphContent = Object.entries(resp)
        .filter(([key]) => OrderLeadSourceGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderPaymentStatusGraphContent = Object.entries(resp)
        .filter(([key]) => OrderPaymentStatusGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderPaymentCardTypeGraphContent = Object.entries(resp)
        .filter(([key]) => OrderPaymentCardTypeGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderPaymentGatewayGraphContent = Object.entries(resp)
        .filter(([key]) => OrderPaymentGatewayGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderInvoiceStatusGraphContent = Object.entries(resp)
        .filter(([key]) => OrderInvoiceStatusGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderTrackingStatusGraphContent = Object.entries(resp)
        .filter(([key]) => OrderTrackingStatusGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderShipmentStatusGraphContent = Object.entries(resp)
        .filter(([key]) => OrderShipmentStatusGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderApprovalStatusGraphContent = Object.entries(resp)
        .filter(([key]) => OrderApprovalStatusGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderFinancialGraphContent = Object.entries(resp)
        .filter(([key]) => OrderFinancialGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const orderStatusGraphContent = Object.entries(resp)
        .filter(([key]) => OrderStatusGraphContent.includes(key as string))
        .map(([key, value]) => ({
            name: key
                .replace(/[_-]/g, " ")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            y: value ? Number(value) : 0,
            color:
                dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
    const result = Object.entries(resp).map(([key, value]) => ({
        label: key
            .replace(/[_-]/g, " ")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        value: value ? Number(value) : 0,
        icon:
            dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.Icon ??
            IconHelpOctagon,
        color:
            dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap]?.color ??
            "var(--mantine-color-blue-filled)",
    }));
    return {
        result,
        graphs: [
            {
                chartTitle: "Quotation Lead Source Summary",
                data: quotationLeadSourceGraphContent,
            },
            {
                chartTitle: "Quotation Status Summary",
                data: quotationStatusGraphContent,
            },
            {
                chartTitle: "Order Lead Source Summary",
                data: orderLeadSourceGraphContent,
            },
            {
                chartTitle: "Order Payment Summary",
                data: orderPaymentStatusGraphContent,
            },
            {
                chartTitle: "Order Payment Card Type Summary",
                data: orderPaymentCardTypeGraphContent,
            },
            {
                chartTitle: "Order Payment Gateway Summary",
                data: orderPaymentGatewayGraphContent,
            },
            {
                chartTitle: "Order Invoice Summary",
                data: orderInvoiceStatusGraphContent,
            },
            {
                chartTitle: "Order Tracking Summary",
                data: orderTrackingStatusGraphContent,
            },
            {
                chartTitle: "Order Shipment Summary",
                data: orderShipmentStatusGraphContent,
            },
            {
                chartTitle: "Order Approval Summary",
                data: orderApprovalStatusGraphContent,
            },
            {
                chartTitle: "Order Financial Summary",
                data: orderFinancialGraphContent,
            },
            {
                chartTitle: "Order Status Summary",
                data: orderStatusGraphContent,
            },
        ],
    };
};

/*
  Dashboard Query Hook Function: This hook is used to fetch information of all the users
*/
export const useDashboardQuery: () => UseQueryResult<
    {
        result: {
            label: string;
            value: number;
            icon: React.ForwardRefExoticComponent<
                IconProps & React.RefAttributes<SVGSVGElement>
            >;
            color: string;
        }[];
        graphs: {
            chartTitle: string;
            data: {
                name: string;
                y: number;
                color: string;
            }[];
        }[];
    },
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: DashboardQueryKey(authToken),
        queryFn: ({ signal }) => DashboardQueryFn({ signal }),
        enabled: authToken !== null,
    });
};
