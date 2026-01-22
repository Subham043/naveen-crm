import { useCallback, useState } from "react";
import axios from "@/utils/axios";
import { useToast } from "./useToast";
import { useSearchQueryParam } from "./useSearchQueryParam";
import type { GenericAbortSignal } from "axios";

/*
 * Toast Hook Type
 */
type ExcelExportHookType = () => {
  excelLoading: boolean;
  exportExcel: (excel_url: string, excel_file_name: string) => Promise<void>;
};

/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const useExcelExport: ExcelExportHookType = () => {
  const { toastError, toastSuccess } = useToast();
  const [excelLoading, setExcelLoading] = useState<boolean>(false);
  const { search } = useSearchQueryParam();

  const exportExcel = useCallback(
    async (
      excel_url: string,
      excel_file_name: string,
      signal?: GenericAbortSignal | undefined,
    ) => {
      setExcelLoading(true);
      const link = document.createElement("a");
      try {
        const params = new URLSearchParams();
        if (search) params.append("filter[search]", search);
        const response = await axios.get(excel_url, {
          params,
          signal,
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        link.href = url;
        link.setAttribute("download", excel_file_name);
        document.body.appendChild(link);
        link.click();
        toastSuccess("Excel Exported Successfully");
      } catch (error) {
        toastError("Something went wrong. Please try again later.");
      } finally {
        setExcelLoading(false);
        link.remove();
      }
    },
    [search, toastError, toastSuccess],
  );

  return {
    exportExcel,
    excelLoading,
  };
};
