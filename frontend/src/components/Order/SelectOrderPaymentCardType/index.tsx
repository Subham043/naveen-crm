import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { value: "1", label: "Mastercard" },
  { value: "2", label: "Visa" },
  { value: "3", label: "Amex" },
  { value: "4", label: "Zelle" },
];

const SelectOrderPaymentCardType = (props: PropType) => {
  const { key = "filter[payment_card_type]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Payment Card Type"}
      w="190px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderPaymentCardType;
