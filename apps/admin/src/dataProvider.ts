import { fetchUtils, DataProvider } from 'react-admin';
import { stringify } from 'query-string';

// Use the correct environment variable
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log(`GET LIST URL: ${url}`);

        const { headers, json } = await httpClient(url);
        return {
            data: json,
            total: json.length, // Adjust this according to your API's response structure
        };
    },
    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        console.log(`GET ONE URL: ${url}`);
        return httpClient(url).then(({ json }) => ({
            data: json,
        }));
    },
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log(`GET MANY URL: ${url}`);
        return httpClient(url).then(({ json }) => ({ data: json }));
    },
    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log(`GET MANY REFERENCE URL: ${url}`);

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: json.length // Adjust this according to your API's response structure
        }));
    },
    update: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        console.log(`UPDATE URL: ${url}`);
        return httpClient(url, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log(`UPDATE MANY URL: ${url}`);
        return httpClient(url, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
    create: (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        console.log(`CREATE URL: ${url}`);
        return httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    },
    delete: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        console.log(`DELETE URL: ${url}`);
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    },
    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log(`DELETE MANY URL: ${url}`);
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    },
};

export default dataProvider;
