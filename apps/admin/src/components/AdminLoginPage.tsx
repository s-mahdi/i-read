import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNotify, useRedirect } from "react-admin";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { axiosClient } from "../api/axiosClient";

interface IFormInput {
  username: string;
  password: string;
}

const AdminLoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const notify = useNotify();
  const redirect = useRedirect();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axiosClient.post("/auth/admin/login", data);
      const { access_token } = response.data;
      localStorage.setItem("authToken", access_token);
      redirect("/");
    } catch (error) {
      notify("نام کاربری یا کلمه عبور نادرست است", { type: "warning" });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: "lg" }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" component="h2">
              ورود ادمین
            </Typography>
            <TextField
              label="نام کاربری"
              fullWidth
              margin="normal"
              {...register("username", { required: "نام کاربری الزامی است" })}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
            />
            <TextField
              label="کلمه عبور"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", { required: "کلمه عبور الزامی است" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              ورود
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminLoginPage;
