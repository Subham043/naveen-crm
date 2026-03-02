import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { value: "1", label: "PO Pending" },
  { value: "2", label: "PO Sent" },
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
      placeholder={"Shipment Status"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderShipmentStatus;
