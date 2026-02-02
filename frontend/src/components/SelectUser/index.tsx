import { AsyncPaginate } from "react-select-async-paginate";
import { getUsersHandler } from "@/utils/data/dal/users";
import { useCallback, useRef } from "react";
import type {
  GroupBase,
  OptionsOrGroups,
  SingleValue,
} from "node_modules/react-select/dist/declarations/src";

type OptionType = {
  value: number;
  label: string;
};

type Props = {
  setSelected: (user: number | undefined) => void;
};

export default function SelectUser({ setSelected }: Props) {
  /** Used to cancel in-flight requests to avoid race conditions */
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number } | undefined,
    ) => {
      // Cancel previous request if still running
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const currentPage = additional?.page ?? 1;

      try {
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        if (search) params.append("filter[search]", search);
        const response = await getUsersHandler(params, controller.signal);
        const options: OptionType[] = response.data.map((user) => ({
          value: user.id,
          label: `${user.name} <${user.email}> (${user.role})`,
        }));
        return {
          options: options,
          hasMore: response.meta.last_page > currentPage,
          additional: {
            page: currentPage + 1,
          },
        };
      } catch (error) {
        return {
          options: [],
          hasMore: false,
          additional: { page: currentPage },
        };
      }
    },
    [],
  );

  const onChange = useCallback(
    (value: SingleValue<OptionType>) => {
      setSelected(value ? value.value : undefined);
    },
    [setSelected],
  );

  return (
    <div style={{ position: "relative", zIndex: 12, minWidth: "480px" }}>
      <AsyncPaginate
        // value={value}
        isMulti={false}
        loadOptions={loadOptions}
        onChange={onChange}
        additional={{
          page: 1,
        }}
        placeholder="Select User"
        debounceTimeout={500}
        isSearchable={true}
        isClearable={true}
      />
    </div>
  );
}
