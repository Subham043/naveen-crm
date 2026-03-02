import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Website", value: "1" },
  { label: "Call", value: "2" },
];

const SelectQuotationLeadSource = (props: PropType) => {
  const { key = "filter[lead_source]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Lead Source"}
      w="170px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectQuotationLeadSource;
