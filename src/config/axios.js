import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001";
const VERSION = import.meta.env.VITE_API_VERSION || "v1";

const clienteAxios = axios.create({
  baseURL: `${BASE}/api/${VERSION}`,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: false,
});

clienteAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

clienteAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("AUTH_TOKEN");
    }
    return Promise.reject(error);
  }
);

export default clienteAxios;
