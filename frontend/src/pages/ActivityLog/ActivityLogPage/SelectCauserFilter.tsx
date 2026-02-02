import SelectUser from "@/components/SelectUser";
import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";

type PropType = {
  key?: string;
};

const SelectCauserFilter = (props: PropType) => {
  const { key = "filter[causer_id]" } = props;
  const { setParamValue } = useCustomQueryParam(key);
  return (
    <SelectUser
      setSelected={(value) => setParamValue(value ? value.toString() : "")}
    />
  );
};

export default SelectCauserFilter;
