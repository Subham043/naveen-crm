import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Website", value: "1" },
  { label: "Lead", value: "2" },
  { label: "Call", value: "3" },
];

const SelectOrderLeadSource = (props: PropType) => {
  const { key = "filter[lead_source]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Lead Source"}
      w="170px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderLeadSource;
