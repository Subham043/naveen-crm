import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "DRAFT", value: "draft" },
  { label: "SUBMITTED FOR APPROVAL", value: "submitted-for-approval" },
  { label: "APPROVED", value: "approved" },
  { label: "REJECTED", value: "rejected" },
];

const SelectOrderFilterStatus = (props: PropType) => {
  const { key = "filter[status]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Status"}
      w="260px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderFilterStatus;
