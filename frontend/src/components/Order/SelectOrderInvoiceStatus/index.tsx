import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Not Generated", value: "0" },
  { label: "Generated", value: "1" },
  { label: "Sent", value: "2" },
];

const SelectOrderInvoiceStatus = (props: PropType) => {
  const { key = "filter[invoice_status]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Invoice Status"}
      w="190px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderInvoiceStatus;
