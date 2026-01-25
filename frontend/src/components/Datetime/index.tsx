import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  value: string | Date;
  format?: string;
};

function Datetime({ value, format = "DD MMM, YYYY hh:mm a" }: Props) {
  return (
    <>
      {dayjs(value)
        .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .format(format)}
    </>
  );
}

export default Datetime;
