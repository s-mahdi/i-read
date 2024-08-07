import { useRecordContext } from "react-admin";
import moment from "jalali-moment";
import Typography from "@mui/material/Typography";

const JalaliDateField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  if (!record) return null;

  const date = moment(record[source]).locale("fa").format("jYYYY/jMM/jDD");

  return <Typography variant="body2">{date}</Typography>;
};

export default JalaliDateField;
