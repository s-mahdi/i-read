import { useRecordContext } from "react-admin";
import Typography from "@mui/material/Typography";

const RoleField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  if (!record) return null;

  const roleMap: { [key: string]: string } = {
    superAdmin: "مدیر کل",
    admin: "مدیر",
    user: "کاربر",
    employee: "کارمند",
  };

  const translatedRole = roleMap[record[source]] || record[source];

  return <Typography variant="body2">{translatedRole}</Typography>;
};

export default RoleField;
