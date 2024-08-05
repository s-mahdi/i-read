import { List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput, Create, useRecordContext } from 'react-admin';
import { IUser } from '../@types/IUser';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="name" />
            <TextField source="lastName" />
            <TextField source="rank" />
            <TextField source="nationalCode" />
            <TextField source="role" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);

const UserTitle = () => {
    const record = useRecordContext<IUser>();
    return <span>User {record ? `"${record.name}"` : ''}</span>;
};

export const UserEdit = () => (
    <Edit title={<UserTitle />}>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="name" />
            <TextInput source="lastName" />
            <TextInput source="rank" />
            <TextInput source="nationalCode" />
            <TextInput source="role" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="name" />
            <TextInput source="lastName" />
            <TextInput source="rank" />
            <TextInput source="nationalCode" />
            <TextInput source="role" />
        </SimpleForm>
    </Create>
);
