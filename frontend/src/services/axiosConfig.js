import axios from "axios";

export const configureAxios = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("tokenAcesso");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
