import { Admin, Resource } from "react-admin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";
import farsiMessages from "ra-language-farsi";
import polyglotI18nProvider from "ra-i18n-polyglot";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import AdminLoginPage from "./components/AdminLoginPage";
import { UserCreate, UserEdit, UserList } from "./components/users";
import CustomLayout from "./components/CustomLayout";

const jss = create({ plugins: [...jssPreset().plugins, rtl] });

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
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
        >
          <Resource
            name="user"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
          />
        </Admin>
      </StylesProvider>
    </ThemeProvider>
  </CacheProvider>
);

export default App;
