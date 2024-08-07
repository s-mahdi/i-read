import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  Create,
  useRecordContext,
} from "react-admin";
import { IUser } from "../@types/IUser";

const rtlInputStyle: React.CSSProperties = {
  direction: "rtl",
};

const roleChoices = [
  { id: "superAdmin", name: "مدیر کل" },
  { id: "admin", name: "مدیر" },
  { id: "user", name: "کاربر" },
  { id: "employee", name: "کارمند" },
];

const rankChoices = [
  { id: "sarbaz_dovom", name: "سرباز دوم" },
  { id: "sarbaz_yekom", name: "سرباز یکم" },
  { id: "sarjooghe", name: "سرجوخه" },
  { id: "goroobans_sevom", name: "گروهبان سوم" },
  { id: "goroobans_dovom", name: "گروهبان دوم" },
  { id: "goroobans_yekom", name: "گروهبان یکم" },
  { id: "ostovar_dovom", name: "استوار دوم" },
  { id: "ostovar_yekom", name: "استوار یکم" },
  { id: "setvan_sevom", name: "ستوان سوم" },
  { id: "setvan_dovom", name: "ستوان دوم" },
  { id: "setvan_yekom", name: "ستوان یکم" },
  { id: "sarvan", name: "سروان" },
  { id: "sargord", name: "سرگرد" },
  { id: "sarkhang_dovom", name: "سرهنگ دوم" },
  { id: "sarkhang", name: "سرهنگ" },
  { id: "sartip_dovom", name: "سرتیپ دوم" },
  { id: "sartip", name: "سرتیپ" },
  { id: "sarlashkar", name: "سرلشکر" },
  { id: "sepahbod", name: "سپهبد" },
  { id: "arteashbod", name: "ارتشبد" },
];

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="شناسه" />
      <TextField source="username" label="نام کاربری" />
      <TextField source="name" label="نام" />
      <TextField source="lastName" label="نام خانوادگی" />
      <TextField source="rank" label="رتبه" />
      <TextField source="nationalCode" label="کد ملی" />
      <TextField source="role" label="نقش" />
      <DateField source="createdAt" label="تاریخ ایجاد" />
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
      <TextInput source="username" label="نام کاربری" style={rtlInputStyle} />
      <TextInput source="name" label="نام" style={rtlInputStyle} />
      <TextInput source="lastName" label="نام خانوادگی" style={rtlInputStyle} />
      <SelectInput
        source="rank"
        label="رتبه"
        choices={rankChoices}
        style={rtlInputStyle}
      />
      <TextInput source="nationalCode" label="کد ملی" style={rtlInputStyle} />
      <SelectInput
        source="role"
        label="نقش"
        choices={roleChoices}
        style={rtlInputStyle}
      />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" label="نام کاربری" style={rtlInputStyle} />
      <TextInput source="name" label="نام" style={rtlInputStyle} />
      <TextInput source="lastName" label="نام خانوادگی" style={rtlInputStyle} />
      <SelectInput
        source="rank"
        label="رتبه"
        choices={rankChoices}
        style={rtlInputStyle}
      />
      <TextInput source="nationalCode" label="کد ملی" style={rtlInputStyle} />
      <SelectInput
        source="role"
        label="نقش"
        choices={roleChoices}
        style={rtlInputStyle}
      />
    </SimpleForm>
  </Create>
);
