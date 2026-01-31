import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "YES", value: "yes" },
  { label: "NO", value: "no" },
];

const SelectOrderApprovalByMe = (props: PropType) => {
  const { key = "filter[approval_by_me]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Approval By Me"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderApprovalByMe;
