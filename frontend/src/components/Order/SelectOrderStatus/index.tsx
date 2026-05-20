import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Relocate" },
  { value: "2", label: "Escalation" },
  { value: "3", label: "Invoice Sent" },
  { value: "4", label: "Tracking Sent" },
  { value: "5", label: "Refund Pending From Yard" },
  { value: "6", label: "Refund Pending To Customer" },
  { value: "7", label: "Cancelled" },
  { value: "8", label: "Part Shipped" },
  { value: "9", label: "PO Sent" },
  { value: "10", label: "ChargeBack" },
  { value: "11", label: "Completed" },
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
