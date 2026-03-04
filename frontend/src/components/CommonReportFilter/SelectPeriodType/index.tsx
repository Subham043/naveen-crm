import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { value: "day", label: "Day" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const SelectPeriodType = (props: PropType) => {
  const { key = "type" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Period Type"}
      w="190px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectPeriodType;
