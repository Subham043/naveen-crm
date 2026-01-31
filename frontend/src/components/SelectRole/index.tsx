import { AsyncPaginate } from "react-select-async-paginate";
import { getRolesHandler } from "@/utils/data/dal/roles";
import { useCallback, useMemo, useRef } from "react";
import type {
  GroupBase,
  OptionsOrGroups,
  SingleValue,
} from "node_modules/react-select/dist/declarations/src";

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  selected: string | undefined;
  setSelected: (role: string | undefined) => void;
};

export default function SelectRole({ selected, setSelected }: Props) {
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
        if (search) params.append("filter[search]", search);
        const response = await getRolesHandler(params, controller.signal);
        const options: OptionType[] = response.map((role) => ({
          value: role.name,
          label: role.name,
        }));
        return {
          options: options,
          hasMore: false,
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

  const value = useMemo(() => {
    return selected ? [{ label: selected, value: selected }] : [];
  }, [selected]);

  const onChange = useCallback(
    (value: SingleValue<OptionType>) => {
      setSelected(value ? value.value : undefined);
    },
    [setSelected],
  );

  return (
    <div style={{ position: "relative", zIndex: 12, minWidth: "300px" }}>
      <AsyncPaginate
        value={value}
        isMulti={false}
        loadOptions={loadOptions}
        onChange={onChange}
        additional={{
          page: 1,
        }}
        placeholder="Select Role"
        debounceTimeout={500}
        isSearchable={true}
        isClearable={true}
      />
    </div>
  );
}
