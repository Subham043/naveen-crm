import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Processing", value: "1" },
  { label: "Shipped", value: "2" },
  { label: "Delivered", value: "3" },
  { label: "Closed", value: "4" },
  { label: "Cancelled", value: "5" },
];

const SelectOrderShipmentStatus = (props: PropType) => {
  const { key = "filter[shipment_status]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Shipment Status"}
      w="200px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderShipmentStatus;
