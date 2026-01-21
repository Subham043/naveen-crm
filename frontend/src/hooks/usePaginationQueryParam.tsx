import { useSearchParams } from "react-router";
import {
  QueryInitialPageParam,
  QueryTotalCount,
} from "@/utils/constants/query";
import { useCallback } from "react";

type PaginationQueryParamHookType = (key?: string) => {
  page: number;
  total: number;
  setPage: (value: number) => void;
  setTotal: (value: number) => void;
};

export const usePaginationQueryParam: PaginationQueryParamHookType = (
  key = "",
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageKey = `page${key}`;
  const totalKey = `total${key}`;

  const page = Number(searchParams.get(pageKey) || QueryInitialPageParam);
  const total = Number(searchParams.get(totalKey) || QueryTotalCount);

  const setPage = useCallback(
    (value: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          value ? params.set(pageKey, String(value)) : params.delete(pageKey);
          return params;
        },
        { replace: true },
      ); // 👈 prevent history spam
    },
    [setSearchParams, pageKey],
  );

  const setTotal = useCallback(
    (value: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          value ? params.set(totalKey, String(value)) : params.delete(totalKey);
          return params;
        },
        { replace: true },
      ); // 👈 prevent history spam
    },
    [setSearchParams, totalKey],
  );

  return {
    page,
    total,
    setPage,
    setTotal,
  };
};
