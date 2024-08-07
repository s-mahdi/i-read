import { Menu } from "react-admin";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  menu: {
    direction: "rtl",
  },
});

const CustomMenu = (props: any) => {
  const classes = useStyles();
  return <Menu {...props} classes={{ paper: classes.menu }} />;
};

export default CustomMenu;
