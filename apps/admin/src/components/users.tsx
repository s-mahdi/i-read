import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  SelectInput,
  useRecordContext,
} from "react-admin";
import JalaliDateField from "./JalaliDateField"; // Import custom date field
import RoleField from "./RoleField"; // Import custom role field
import { IUser } from "../@types/IUser";

const ranks = [
  { id: "سرباز", name: "سرباز" },
  { id: "کارمند", name: "کارمند" },
  { id: "روحانی", name: "روحانی" },
  { id: "گروهبان دوم", name: "گروهبان دوم" },
  { id: "گروهبان یکم", name: "گروهبان یکم" },
  { id: "استوار دوم", name: "استوار دوم" },
  { id: "استوار یکم", name: "استوار یکم" },
  { id: "ستوان سوم", name: "ستوان سوم" },
  { id: "ستوان دوم", name: "ستوان دوم" },
  { id: "ستوان یکم", name: "ستوان یکم" },
  { id: "سروان", name: "سروان" },
  { id: "سرگرد", name: "سرگرد" },
  { id: "سرهنگ دوم", name: "سرهنگ دوم" },
  { id: "سرهنگ", name: "سرهنگ" },
  { id: "سرتیپ دوم", name: "سرتیپ دوم" },
  { id: "سرتیپ", name: "سرتیپ" },
  { id: "سرلشکر", name: "سرلشکر" },
  { id: "سپهبد", name: "سپهبد" },
  { id: "ارتشبد", name: "ارتشبد" },
];

const rtlInputStyle: React.CSSProperties = {
  direction: "rtl",
};

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="name" />
      <TextField source="lastName" />
      <TextField source="rank" />
      <TextField source="nationalCode" />
      <RoleField source="role" />
      <JalaliDateField source="createdAt" />
    </Datagrid>
  </List>
);

const UserTitle = () => {
  const record = useRecordContext<IUser>();
  return <span>کاربر {record ? `"${record.name}"` : ""}</span>;
};

export const UserEdit = () => (
  <Edit title={<UserTitle />}>
    <SimpleForm>
      <TextInput source="username" style={rtlInputStyle} />
      <TextInput source="name" style={rtlInputStyle} />
      <TextInput source="lastName" style={rtlInputStyle} />
      <SelectInput source="rank" choices={ranks} style={rtlInputStyle} />
      <TextInput source="nationalCode" style={rtlInputStyle} />
      <SelectInput
        source="role"
        choices={[
          { id: "superAdmin", name: "مدیر کل" },
          { id: "admin", name: "مدیر" },
          { id: "user", name: "کاربر" },
          { id: "employee", name: "کارمند" },
        ]}
        style={rtlInputStyle}
      />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" style={rtlInputStyle} />
      <TextInput source="name" style={rtlInputStyle} />
      <TextInput source="lastName" style={rtlInputStyle} />
      <SelectInput source="rank" choices={ranks} style={rtlInputStyle} />
      <TextInput source="nationalCode" style={rtlInputStyle} />
      <SelectInput
        source="role"
        choices={[
          { id: "superAdmin", name: "مدیر کل" },
          { id: "admin", name: "مدیر" },
          { id: "user", name: "کاربر" },
          { id: "employee", name: "کارمند" },
        ]}
        style={rtlInputStyle}
      />
    </SimpleForm>
  </Create>
);
