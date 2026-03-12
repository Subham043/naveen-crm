import { useCallback, useState } from "react";
import axios from "@/utils/axios";
import { useToast } from "./useToast";
import type { GenericAbortSignal } from "axios";

/*
 * Toast Hook Type
 */
type PdfExportHookType = () => {
  pdfLoading: boolean;
  exportPdf: (pdf_url: string, pdf_file_name: string) => Promise<void>;
};

/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const usePdfExport: PdfExportHookType = () => {
  const { toastError, toastSuccess } = useToast();
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);

  const exportPdf = useCallback(
    async (
      pdf_url: string,
      pdf_file_name: string,
      signal?: GenericAbortSignal | undefined,
    ) => {
      setPdfLoading(true);
      try {
        const response = await axios.get(pdf_url, {
          signal,
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" }),
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", pdf_file_name);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toastSuccess("Pdf Exported Successfully");
      } catch (error) {
        toastError("Something went wrong. Please try again later.");
      } finally {
        setPdfLoading(false);
      }
    },
    [toastError, toastSuccess],
  );

  return {
    exportPdf,
    pdfLoading,
  };
};
