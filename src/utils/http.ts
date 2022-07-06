import endpoints from "@/config/endpoints";
import httpConfig from "@/config/http";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookie from "js-cookie";

const http = axios.create(httpConfig.requestConfig);

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (
      config.method !== "get" &&
      Cookie.get(httpConfig.csrfTokenName) === undefined
    )
      await http.get(endpoints.csrf);
    return config;
  },
  (err): Promise<never> => Promise.reject(err)
);

http.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<never> => {
    if (
      error.response!.status === 401 &&
      !httpConfig.dontRedirects.includes(error.response!.config.url!)
    ) {
      httpConfig.unauthHandle();
    }
    return Promise.reject(error.response);
  }
);

export default http;
