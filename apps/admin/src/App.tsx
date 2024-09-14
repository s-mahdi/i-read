import { Admin, Resource } from "react-admin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";
import polyglotI18nProvider from "ra-i18n-polyglot";
import dataProvider from "./dataProvider"; // Your custom dataProvider
import authProvider from "./authProvider";
import AdminLoginPage from "./components/AdminLoginPage";
import { UserCreate, UserEdit, UserList } from "./components/users";
import CustomLayout from "./components/CustomLayout";
import farsiMessages from "./i18n/ra-langualge-farsi";
import UserIcon from "@mui/icons-material/Group";
import AnalyticsIcon from "@mui/icons-material/Assessment";
import Analytics from "./resources/analytics/Analytics";

const jss = create({ plugins: [...jssPreset().plugins, rtl] });

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#32B7C5",
    },
    secondary: {
      main: "#1B3A4B",
    },
  },
  typography: {
    fontFamily: "Vazir, Roboto, Arial, sans-serif",
  },
});

const i18nProvider = polyglotI18nProvider(() => farsiMessages, "fa");

const App = () => (
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Admin
          layout={CustomLayout}
          dataProvider={dataProvider}
          authProvider={authProvider}
          loginPage={AdminLoginPage}
          i18nProvider={i18nProvider}
          theme={theme}
        >
          <Resource
            name="user"
            icon={UserIcon}
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
          />
          <Resource name="analytics" icon={AnalyticsIcon} list={Analytics} />
        </Admin>
      </StylesProvider>
    </ThemeProvider>
  </CacheProvider>
);

export default App;
