import SelectRole from "@/components/SelectRole";
import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";

type PropType = {
  key?: string;
};

const SelectRoleFilter = (props: PropType) => {
  const { key = "filter[role]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <SelectRole
      selected={paramValue}
      setSelected={(value) => setParamValue(value || "")}
    />
  );
};

export default SelectRoleFilter;
