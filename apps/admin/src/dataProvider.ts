import { axiosClient } from "./api/axiosClient";
import {
  CreateParams,
  CreateResult,
  DataProvider,
  Identifier,
  RaRecord,
} from "react-admin";
import { stringify } from "query-string";

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const pagination = params.pagination;
    const sort = params.sort;

    const page = pagination?.page ?? 1;
    const perPage = pagination?.perPage ?? 10;

    const query = {
      sort: JSON.stringify([sort?.field, sort?.order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };

    const url = `/${resource}?${stringify(query)}`;

    const { data } = await axiosClient.get(url);
    return {
      data,
      total: data.length,
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

    const { data } = await axiosClient.get(url);
    return {
      data,
      total: data.length,
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

  create: async <
    RecordType extends Omit<RaRecord, "id"> = any,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier }
  >(
    resource: string,
    params: CreateParams<RecordType>
  ): Promise<CreateResult<ResultRecordType>> => {
    const url = `/${resource}`;
    const { data } = await axiosClient.post(url, params.data);

    return {
      data: { ...params.data, id: data.id } as unknown as ResultRecordType,
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
