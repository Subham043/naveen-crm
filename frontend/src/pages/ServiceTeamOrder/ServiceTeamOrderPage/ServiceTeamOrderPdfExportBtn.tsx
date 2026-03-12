import { usePdfExport } from "@/hooks/usePdfExport";
import { api_routes } from "@/utils/routes/api_routes";
import { Menu } from "@mantine/core";
import { IconPdf } from "@tabler/icons-react";
import { useCallback } from "react";

const ServiceTeamOrderPdfExportBtn = ({ order_id }: { order_id: number }) => {
  const { exportPdf, pdfLoading } = usePdfExport();

  const onExportHandler = useCallback(async () => {
    await exportPdf(
      `${api_routes.serviceTeam.orders.generateInvoice}/${order_id}`,
      `WAM${order_id}.pdf`,
    );
  }, [exportPdf]);

  return (
    <Menu.Item
      leftSection={<IconPdf size={16} stroke={1.5} />}
      type="button"
      onClick={onExportHandler}
      disabled={pdfLoading}
    >
      Invoice
    </Menu.Item>
  );
};

export default ServiceTeamOrderPdfExportBtn;
