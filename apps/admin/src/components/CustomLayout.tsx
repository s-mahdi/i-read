import { Layout, LayoutProps, AppBar } from "react-admin";
import CustomMenu from "./CustomMenu"; // Import custom menu
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  layout: {
    direction: "rtl",
  },
});

const CustomAppBar = (props: any) => <AppBar {...props} position="fixed" />;

const CustomLayout = (props: LayoutProps) => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Layout {...props} menu={CustomMenu} appBar={CustomAppBar} />
    </div>
  );
};

export default CustomLayout;
