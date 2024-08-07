import { axiosClient } from "./api/axiosClient";
import { DataProvider } from "react-admin";
import { stringify } from "query-string";

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `/${resource}?${stringify(query)}`;

    const { data, headers } = await axiosClient.get(url);
    return {
      data,
      total: data.length, // Adjust this according to your API's response structure
    };
  },
  getOne: async (resource, params) => {
    const url = `/${resource}/${params.id}`;
    const { data } = await axiosClient.get(url);
    return { data };
  },
  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `/${resource}?${stringify(query)}`;
    const { data } = await axiosClient.get(url);
    return { data };
  },
  getManyReference: async (resource, params) => {
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
    const url = `/${resource}?${stringify(query)}`;

    const { data, headers } = await axiosClient.get(url);
    return {
      data,
      total: data.length, // Adjust this according to your API's response structure
    };
  },
  update: async (resource, params) => {
    const url = `/${resource}/${params.id}`;
    const { data } = await axiosClient.patch(url, params.data);
    return { data };
  },
  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `/${resource}?${stringify(query)}`;
    const { data } = await axiosClient.patch(url, params.data);
    return { data };
  },
  create: async (resource, params) => {
    const url = `/${resource}`;
    const { data } = await axiosClient.post(url, params.data);
    return {
      data: { ...params.data, id: data.id },
    };
  },
  delete: async (resource, params) => {
    const url = `/${resource}/${params.id}`;
    const { data } = await axiosClient.delete(url);
    return { data };
  },
  deleteMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `/${resource}?${stringify(query)}`;
    const { data } = await axiosClient.delete(url);
    return { data };
  },
};

export default dataProvider;
