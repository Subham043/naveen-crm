import { usePdfExport } from "@/hooks/usePdfExport";
import PermittedLayout from "@/layouts/PermittedLayout";
import { api_routes } from "@/utils/routes/api_routes";
import { Button } from "@mantine/core";
import { IconPdf } from "@tabler/icons-react";
import { useCallback } from "react";

const OrderViewPdfExportBtn = ({
  order_id,
  quotation_status,
}: {
  order_id: number;
  quotation_status?: number;
}) => {
  const { exportPdf, pdfLoading } = usePdfExport();

  const onExportHandler = useCallback(async () => {
    await exportPdf(
      `${api_routes.orders.generateInvoice}/${order_id}`,
      `WAM${order_id}.pdf`,
    );
  }, [exportPdf]);

  return (
    <PermittedLayout
      outletType="children"
      allowedRoles={["Super-Admin"]}
      additionalCondition={quotation_status === 1}
    >
      <Button
        variant="filled"
        leftSection={<IconPdf size={16} />}
        color="cyan"
        type="button"
        onClick={onExportHandler}
        disabled={pdfLoading}
        loading={pdfLoading}
      >
        Invoice
      </Button>
    </PermittedLayout>
  );
};

export default OrderViewPdfExportBtn;
