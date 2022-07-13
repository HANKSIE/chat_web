import EchoManager from "@/utils/echoManager";
import env from "@/utils/env";
import EventManager from "@/utils/eventManager";
import { AxiosRequestConfig } from "axios";
import endpoints from "./endpoints";

export default {
  requestConfig: {
    baseURL: env("VITE_BACKEND_URL"),
    withCredentials: true,
  },
  //Don't redirect when unauthentication
  dontRedirects: [endpoints.auth.user],
  csrfTokenName: "XSRF-TOKEN",
  unauthHandle: () => EventManager.dispatch(EventManager.EventType.LOGOUT),
  interceptors: {
    request: (config: AxiosRequestConfig) => {
      if (EchoManager.echo)
        config.headers!["X-Socket-ID"] = EchoManager.echo.socketId();
    },
  },
};
