import { Admin, Resource } from 'react-admin';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';
import dataProvider from './dataProvider';
import { UserCreate, UserEdit, UserList } from './components/users';

const jss = create({ plugins: [...jssPreset().plugins, rtl] });

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

const App = () => (
    <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
            <StylesProvider jss={jss}>
                <Admin dataProvider={dataProvider}>
                    <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} />
                </Admin>
            </StylesProvider>
        </ThemeProvider>
    </CacheProvider>
);

export default App;
