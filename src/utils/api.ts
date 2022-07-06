import http from "@/utils/http";
import { BroadcastAuthResponse, LoginResponse } from "@/types/responses/auth";
import { AxiosResponse } from "axios";
import endpoints from "@/config/endpoints";
const { auth, socialite } = endpoints;
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
        return http.get(socialite.group);
      },
    },
  },
};

export default api;
