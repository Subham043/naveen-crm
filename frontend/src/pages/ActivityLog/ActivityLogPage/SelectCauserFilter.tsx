import SelectUser from "@/components/SelectUser";
import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import type { AvailableRoles } from "@/utils/types";
import { useMemo } from "react";

type PropType = {
  key?: string;
  causers: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: AvailableRoles;
  }[];
};

const SelectCauserFilter = (props: PropType) => {
  const { key = "filter[causer_id]", causers } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  const selected = useMemo(() => {
    if (!paramValue) return undefined;
    if (causers.length === 0) return undefined;
    const causer = causers.find((causer) => causer.id === Number(paramValue));
    if (!causer) return undefined;
    return {
      value: causer.id,
      label: `${causer.name} <${causer.email}> (${causer.role})`,
    };
  }, [paramValue, causers]);
  return (
    <SelectUser
      setSelected={(value) => setParamValue(value ? value.toString() : "")}
      selected={selected}
    />
  );
};

export default SelectCauserFilter;
