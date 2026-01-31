import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Pending", value: "0" },
  { label: "Paid", value: "1" },
  { label: "Partial", value: "2" },
];

const SelectOrderPaymentStatus = (props: PropType) => {
  const { key = "filter[payment_status]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Payment Status"}
      w="190px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderPaymentStatus;
