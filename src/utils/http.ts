import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookie from "js-cookie";
import clearAuthAndRedirectToLogin from "./clearAuthAndRedirectToLogin";
const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.method !== "get" && Cookie.get("XSRF-TOKEN") === undefined)
      await http.get("sanctum/csrf-cookie");
    return config;
  },
  (err): Promise<never> => Promise.reject(err)
);

// 不須重定向網址, 避免get user => 401 => Login Page的循環
const DontRedirectUrl = ["user"];

http.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<never> => {
    if (
      (error.response!.status === 401,
      !DontRedirectUrl.includes(error.response!.config.url!))
    ) {
      clearAuthAndRedirectToLogin();
    }
    return Promise.reject(error.response);
  }
);

export default http;
