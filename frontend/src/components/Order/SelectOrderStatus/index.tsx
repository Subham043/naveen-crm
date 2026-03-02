import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Escalation" },
  { value: "2", label: "Cancelled" },
  { value: "3", label: "Relocate Po Sent" },
  { value: "4", label: "Pending For Refund" },
  { value: "5", label: "Refunded" },
  { value: "6", label: "Pending Part Shipped" },
  { value: "7", label: "Completed" },
  { value: "8", label: "ChargeBack" },
  { value: "9", label: "Yard Relocate" },
];

const SelectOrderStatus = (props: PropType) => {
  const { key = "filter[order_status]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Order Status"}
      w="190px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderStatus;
