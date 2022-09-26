import endpoints from "@/config/endpoints";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookie from "js-cookie";
import EchoManager from "./echoManager";
import env from "./env";
import EventManager from "./eventManager";

const http = axios.create({
  baseURL: env("VITE_BACKEND_URL"),
  withCredentials: true,
});

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.method !== "get" && Cookie.get("XSRF-TOKEN") === undefined)
      await http.get(endpoints.csrf);

    if (EchoManager.echo)
      config.headers!["X-Socket-ID"] = EchoManager.echo.socketId();
    return config;
  },
  (err): Promise<never> => Promise.reject(err)
);

http.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<never> => {
    if (
      [401].includes(error.response!.status) &&
      ![endpoints.auth.user].includes(error.response!.config.url!)
    ) {
      EventManager.dispatch(EventManager.EventType.LOGOUT);
    }
    return Promise.reject(error);
  }
);

export default http;
