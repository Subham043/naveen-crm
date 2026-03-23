import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { value: "1", label: "PO Pending" },
  { value: "2", label: "PO Sent" },
];

const SelectOrderPOStatus = (props: PropType) => {
  const { key = "filter[po_status]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"PO Status"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderPOStatus;
