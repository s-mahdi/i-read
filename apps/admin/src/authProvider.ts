import { AuthProvider } from "react-admin";
import { axiosClient } from "./api/axiosClient";

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await axiosClient.post("/auth/admin/login", {
        username,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem("authToken", access_token);
    } catch (error) {
      throw new Error("Invalid login credentials");
    }
  },
  logout: () => {
    localStorage.removeItem("authToken");
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("authToken");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("authToken")
      ? Promise.resolve()
      : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
