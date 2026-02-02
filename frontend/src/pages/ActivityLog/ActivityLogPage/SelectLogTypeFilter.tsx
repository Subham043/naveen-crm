import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Order Created", value: "order~created" },
  { label: "Order Updated", value: "order~updated" },
  { label: "Order Deleted", value: "order~deleted" },
  {
    label: "Order Auto Assigned To Agent",
    value: "order~order_auto_assigned_to_agent",
  },
  {
    label: "Order Submitted For Approval",
    value: "order~order_submitted_for_approval",
  },
  { label: "Order Approved", value: "order~order_approved" },
  { label: "Order Rejected", value: "order~order_rejected" },
  { label: "User Created", value: "user~created" },
  { label: "User Updated", value: "user~updated" },
  { label: "User Deleted", value: "user~deleted" },
  { label: "User Email Verified", value: "email_verified~email_verified" },
  { label: "User Logout", value: "logout~logged_out" },
  { label: "User Login", value: "login~logged_in" },
];

const SelectLogTypeFilter = (props: PropType) => {
  const { key = "filter[log_name]" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Log Type"}
      w="250px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectLogTypeFilter;
