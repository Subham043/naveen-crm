import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getDashboardHandler } from "../dal/dashboard";
import { useAuthStore } from "@/stores/auth.store";
import { IconAlignBoxLeftStretch, IconAppWindow, IconBasketStar, IconBrandCashapp, IconBrowserCheck, IconCancel, IconCashMoveBack, IconChecks, IconCircleCheck, IconCircleDashedCheck, IconCreditCardPay, IconCubeSend, IconFileSpreadsheet, IconHelpOctagon, IconInvoice, IconLoader, IconNotesOff, IconPhoneCalling, IconPinInvoke, IconReceipt, IconReceipt2, IconShoppingCartDollar, IconTagStarred, IconTruckDelivery, IconX, IconXboxX, type IconProps } from "@tabler/icons-react";


export const DashboardQueryKey = (token: string | null) => {
    return ["dashboard", token]
};

const TotalOrders = "totalOrders"
const TotalWebsiteLeadOrders = "totalWebsiteLeadOrders"
const TotalLeadOrders = "totalLeadOrders"
const TotalCallOrders = "totalCallOrders"
const TotalPrice = "totalPrice"
const CostPrice = "costPrice"
const ShippingCost = "shippingCost"
const SalesTax = "salesTax"
const GrossProfit = "grossProfit"
const TotalPaymentPendingOrders = "totalPaymentPendingOrders"
const TotalPaymentPaidOrders = "totalPaymentPaidOrders"
const TotalPaymentPartiallyPaidOrders = "totalPaymentPartiallyPaidOrders"
const TotalInvoiceNotGeneratedOrders = "totalInvoiceNotGeneratedOrders"
const TotalInvoiceGeneratedOrders = "totalInvoiceGeneratedOrders"
const TotalInvoiceSentOrders = "totalInvoiceSentOrders"
const TotalShipmentProcessingOrders = "totalShipmentProcessingOrders"
const TotalShipmentShippedOrders = "totalShipmentShippedOrders"
const TotalShipmentDeliveredOrders = "totalShipmentDeliveredOrders"
const TotalShipmentClosedOrders = "totalShipmentClosedOrders"
const TotalShipmentCancelledOrders = "totalShipmentCancelledOrders"
const TotalDraftOrders = "totalDraftOrders"
const TotalApprovalPendingOrders = "totalApprovalPendingOrders"
const TotalApprovedOrders = "totalApprovedOrders"
const TotalRejectedOrders = "totalRejectedOrders"
const TotalApprovedByMeOrders = "totalApprovedByMeOrders"
const TotalRejectedByMeOrders = "totalRejectedByMeOrders"

const OrderLeadSourceGraphContent = [
    TotalWebsiteLeadOrders,
    TotalLeadOrders,
    TotalCallOrders,
];

const OrderPaymentStatusGraphContent = [
    TotalPaymentPendingOrders,
    TotalPaymentPaidOrders,
    TotalPaymentPartiallyPaidOrders,
];

const OrderInvoiceStatusGraphContent = [
    TotalInvoiceNotGeneratedOrders,
    TotalInvoiceGeneratedOrders,
    TotalInvoiceSentOrders,
];

const OrderShipmentStatusGraphContent = [
    TotalShipmentProcessingOrders,
    TotalShipmentShippedOrders,
    TotalShipmentDeliveredOrders,
    TotalShipmentClosedOrders,
    TotalShipmentCancelledOrders,
];

const OrderApprovalStatusGraphContent = [
    TotalDraftOrders,
    TotalApprovalPendingOrders,
    TotalApprovedOrders,
    TotalRejectedOrders,
    TotalApprovedByMeOrders,
    TotalRejectedByMeOrders,
];

const OrderFinancialGraphContent = [
    TotalPrice,
    CostPrice,
    ShippingCost,
    SalesTax,
    GrossProfit,
];

const dashboardKeyIconMap = {
    [TotalOrders]: { Icon: IconFileSpreadsheet, color: "var(--mantine-color-blue-filled)" },
    [TotalWebsiteLeadOrders]: { Icon: IconAppWindow, color: "var(--mantine-color-green-filled)" },
    [TotalLeadOrders]: { Icon: IconFileSpreadsheet, color: "var(--mantine-color-cyan-filled)" },
    [TotalCallOrders]: { Icon: IconPhoneCalling, color: "var(--mantine-color-indigo-filled)" },
    [TotalPrice]: { Icon: IconReceipt2, color: "var(--mantine-color-teal-filled)" },
    [CostPrice]: { Icon: IconTagStarred, color: "var(--mantine-color-indigo-filled)" },
    [ShippingCost]: { Icon: IconShoppingCartDollar, color: "var(--mantine-color-orange-filled)" },
    [SalesTax]: { Icon: IconReceipt, color: "var(--mantine-color-cyan-filled)" },
    [GrossProfit]: { Icon: IconBasketStar, color: "var(--mantine-color-green-filled)" },
    [TotalPaymentPendingOrders]: { Icon: IconCashMoveBack, color: "var(--mantine-color-red-filled)" },
    [TotalPaymentPaidOrders]: { Icon: IconBrandCashapp, color: "var(--mantine-color-teal-filled)" },
    [TotalPaymentPartiallyPaidOrders]: { Icon: IconCreditCardPay, color: "var(--mantine-color-orange-filled)" },
    [TotalInvoiceNotGeneratedOrders]: { Icon: IconAlignBoxLeftStretch, color: "var(--mantine-color-gray-filled)" },
    [TotalInvoiceGeneratedOrders]: { Icon: IconInvoice, color: "var(--mantine-color-violet-filled)" },
    [TotalInvoiceSentOrders]: { Icon: IconPinInvoke, color: "var(--mantine-color-teal-filled)" },
    [TotalShipmentProcessingOrders]: { Icon: IconLoader, color: "var(--mantine-color-gray-filled)" },
    [TotalShipmentShippedOrders]: { Icon: IconCubeSend, color: "var(--mantine-color-yellow-filled)" },
    [TotalShipmentDeliveredOrders]: { Icon: IconTruckDelivery, color: "var(--mantine-color-orange-filled)" },
    [TotalShipmentClosedOrders]: { Icon: IconBrowserCheck, color: "var(--mantine-color-green-filled)" },
    [TotalShipmentCancelledOrders]: { Icon: IconCancel, color: "var(--mantine-color-red-filled)" },
    [TotalDraftOrders]: { Icon: IconNotesOff, color: "var(--mantine-color-gray-filled)" },
    [TotalApprovalPendingOrders]: { Icon: IconCircleDashedCheck, color: "var(--mantine-color-yellow-filled)" },
    [TotalApprovedOrders]: { Icon: IconCircleCheck, color: "var(--mantine-color-green-filled)" },
    [TotalRejectedOrders]: { Icon: IconXboxX, color: "var(--mantine-color-red-filled)" },
    [TotalApprovedByMeOrders]: { Icon: IconChecks, color: "var(--mantine-color-teal-filled)" },
    [TotalRejectedByMeOrders]: { Icon: IconX, color: "var(--mantine-color-orange-filled)" },
}

export const DashboardQueryFn = async ({ signal }: { signal?: AbortSignal }) => {
    const resp = await getDashboardHandler(signal);
    const orderLeadSourceGraphContent = Object.entries(resp).filter(([key]) => OrderLeadSourceGraphContent.includes(key as string)).map(([key, value]) => ({
        name: key.replace(/[_-]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, c => c.toUpperCase()),
        y: value ? Number(value) : 0,
        color: dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap].color ?? "var(--mantine-color-blue-filled)"
    }));
    const orderPaymentStatusGraphContent = Object.entries(resp).filter(([key]) => OrderPaymentStatusGraphContent.includes(key as string)).map(([key, value]) => ({
        name: key.replace(/[_-]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, c => c.toUpperCase()),
        y: value ? Number(value) : 0,
        color: dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap].color ?? "var(--mantine-color-blue-filled)"
    }));
    const orderInvoiceStatusGraphContent = Object.entries(resp).filter(([key]) => OrderInvoiceStatusGraphContent.includes(key as string)).map(([key, value]) => ({
        name: key.replace(/[_-]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, c => c.toUpperCase()),
        y: value ? Number(value) : 0,
        color: dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap].color ?? "var(--mantine-color-blue-filled)"
    }));
    const orderShipmentStatusGraphContent = Object.entries(resp).filter(([key]) => OrderShipmentStatusGraphContent.includes(key as string)).map(([key, value]) => ({
        name: key.replace(/[_-]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, c => c.toUpperCase()),
        y: value ? Number(value) : 0,
        color: dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap].color ?? "var(--mantine-color-blue-filled)"
    }));
    const orderApprovalStatusGraphContent = Object.entries(resp).filter(([key]) => OrderApprovalStatusGraphContent.includes(key as string)).map(([key, value]) => ({
        name: key.replace(/[_-]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, c => c.toUpperCase()),
        y: value ? Number(value) : 0,
        color: dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap].color ?? "var(--mantine-color-blue-filled)"
    }));
    const orderFinancialGraphContent = Object.entries(resp).filter(([key]) => OrderFinancialGraphContent.includes(key as string)).map(([key, value]) => ({
        name: key.replace(/[_-]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, c => c.toUpperCase()),
        y: value ? Number(value) : 0,
        color: dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap].color ?? "var(--mantine-color-blue-filled)"
    }));
    const result = Object.entries(resp).map(([key, value]) => ({
        label: key.replace(/[_-]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, c => c.toUpperCase()),
        value: value ? Number(value) : 0,
        icon: dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap].Icon ?? IconHelpOctagon,
        color: dashboardKeyIconMap[key as keyof typeof dashboardKeyIconMap].color ?? "var(--mantine-color-blue-filled)"
    }));
    return {
        result,
        graphs: [
            {
                chartTitle: "Order Lead Source Summary",
                data: orderLeadSourceGraphContent,
            },
            {
                chartTitle: "Order Payment Summary",
                data: orderPaymentStatusGraphContent,
            },
            {
                chartTitle: "Order Invoice Summary",
                data: orderInvoiceStatusGraphContent,
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
        ]
    };
}

/*
  Dashboard Query Hook Function: This hook is used to fetch information of all the users
*/
export const useDashboardQuery: () => UseQueryResult<
    {
        result: {
            label: string;
            value: number;
            icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
            color: string;
        }[],
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
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: DashboardQueryKey(authToken),
        queryFn: ({ signal }) => DashboardQueryFn({ signal }),
        enabled: authToken !== null,
    });
};