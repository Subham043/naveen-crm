import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "DRAFT", value: "draft" },
  { label: "APPROVAL PENDING", value: "approval-pending" },
  { label: "APPROVED", value: "approved" },
  { label: "REJECTED", value: "rejected" },
];

const SelectOrderStatus = (props: PropType) => {
  const { key = "filter[status]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Order Status"}
      w="220px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderStatus;
