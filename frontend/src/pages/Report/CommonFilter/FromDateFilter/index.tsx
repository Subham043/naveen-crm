import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import CommonDateFilter from "../CommonDateFilter";

const FROM_DATE_KEY = "filter[from_date]";

const FromDateFilter = () => {
  const { paramValue: fromDate, setParamValue: setFromDate } =
    useCustomQueryParam(FROM_DATE_KEY);
  return (
    <CommonDateFilter
      label="From Date"
      date={fromDate}
      setDate={(date) => setFromDate(date ? date : "")}
    />
  );
};

export default FromDateFilter;
