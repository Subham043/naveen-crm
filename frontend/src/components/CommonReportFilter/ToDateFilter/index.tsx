import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import CommonDateFilter from "../CommonDateFilter";

const TO_DATE_KEY = "filter[to_date]";

const ToDateFilter = () => {
  const { paramValue: toDate, setParamValue: setToDate } =
    useCustomQueryParam(TO_DATE_KEY);
  return (
    <CommonDateFilter
      label="To Date"
      date={toDate}
      setDate={(date) => setToDate(date ? date : "")}
    />
  );
};

export default ToDateFilter;
