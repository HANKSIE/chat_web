import http from "@/utils/http";
import { BroadcastAuthResponse, LoginResponse } from "@/types/responses/auth";
import { AxiosResponse } from "axios";
import endpoints from "@/config/endpoints";
import SimplePaginate from "@/types/simplePaginate";
const { auth, socialite } = endpoints;

const simplePaginate =
  <T>(url: string) =>
  (
    perPage: number,
    keyword: string
  ): Promise<AxiosResponse<SimplePaginate<T>>> =>
    http.get(`${url}/${perPage}/${keyword}`);

const api = {
  auth: {
    register(
      name: string,
      avatar: File | null,
      email: string,
      password: string,
      password_confirmation: string
    ): Promise<AxiosResponse<LoginResponse>> {
      const formData = new FormData();
      formData.append("name", name);
      if (avatar) formData.append("avatar", avatar);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
      return http.post(auth.register, formData);
    },
    login(
      email: string,
      password: string
    ): Promise<AxiosResponse<LoginResponse>> {
      return http.post(auth.login, { email, password });
    },
    logout(): Promise<AxiosResponse<void>> {
      return http.post(auth.logout);
    },
    loadUser(): Promise<AxiosResponse<LoginResponse>> {
      return http.get(auth.user);
    },
    broadcast(
      socketID: string,
      channelName: string
    ): Promise<AxiosResponse<BroadcastAuthResponse>> {
      return http.post(auth.broadcast, {
        socket_id: socketID,
        channel_name: channelName,
      });
    },
  },
  socialite: {
    group: {
      loadAllIDs(): Promise<
        AxiosResponse<{
          groups: number[];
        }>
      > {
        return http.get(socialite.group.allIDs);
      },
    },
  },
  common: {
    simplePaginate: {
      init<T>(
        url: string,
        perPage = 5,
        keyword = ""
      ): Promise<AxiosResponse<SimplePaginate<T>>> {
        return simplePaginate<T>(url)(perPage, keyword);
      },
      page<T>(pageUrl: string): Promise<AxiosResponse<SimplePaginate<T>>> {
        return http.get(pageUrl);
      },
    },
  },
};

export default api;
