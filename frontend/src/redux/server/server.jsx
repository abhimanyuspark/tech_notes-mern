import axios from "axios";
import { refreshAuth, logOutAuth } from "../fetures/authSlice";
import { store } from "../store";

const url =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const newToken = await store.dispatch(refreshAuth());

      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config); // Retry request with new token
      } else {
        store.dispatch(logOutAuth());
      }
    }
    return Promise.reject(error);
  }
);

export default api;
