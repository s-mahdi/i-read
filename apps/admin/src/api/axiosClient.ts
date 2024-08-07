import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL,
  timeout: 50000,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const jwtToken = localStorage.getItem("authToken");
    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosClient };
