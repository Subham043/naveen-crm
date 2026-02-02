import { Box, TextInput } from "@mantine/core";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

type Props = {
  label: string;
  date?: string;
  setDate: (date?: string) => void;
};

const CommonDateFilter = ({ label, date, setDate }: Props) => {
  return (
    <Box pos="relative" flex={1}>
      <DatePicker
        selected={date ? new Date(date) : null}
        onChange={(value) => {
          setDate(value ? dayjs(value).format("YYYY-MM-DD") : undefined);
        }}
        placeholderText={label}
        dateFormat="MMMM d, yyyy"
        closeOnScroll={true}
        popperPlacement="top-end"
        customInput={<TextInput placeholder={label} w="100%" size="sm" />}
      />
    </Box>
  );
};

export default CommonDateFilter;
