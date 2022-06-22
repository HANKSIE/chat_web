import axios, { AxiosError, AxiosResponse } from "axios";

const http = axios.create({
  baseURL: `${import.meta.env.VITE_CHAT_SERVER_HOST}:${
    import.meta.env.VITE_CHAT_SERVER_PORT
  }`,
  withCredentials: true,
});

http.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<never> => {
    if ([401, 419].includes(error.response!.status)) {
      //redirect to login page
    }
    return Promise.reject(error.response);
  }
);

export default http;
