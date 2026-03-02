import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { value: "1", label: "Stripe" },
  { value: "2", label: "Boa" },
  { value: "3", label: "Zelle" },
];

const SelectOrderPaymentGateway = (props: PropType) => {
  const { key = "filter[payment_gateway]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Payment Gateway"}
      w="190px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderPaymentGateway;
