import { DatagridConfigurable, List, TextField } from "react-admin";

const ProvinceAnalytics = () => {
  return (
    <List>
      <DatagridConfigurable bulkActionButtons={false}>
        <TextField source="provinceName" />
        <TextField source="numberOfUsers" />
        <TextField source="totalSchedules" />
        <TextField source="doneSchedules" />
        <TextField source="activityRate" />
      </DatagridConfigurable>
    </List>
  );
};

export default ProvinceAnalytics;
