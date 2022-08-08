import http from "@/utils/http";
import { BroadcastAuthResponse, LoginResponse } from "@/types/responses/auth";
import { AxiosResponse } from "axios";
import endpoints from "@/config/endpoints";
import SimplePaginate from "@/types/simplePaginate";
import Message from "@/types/message";
import MessageRead from "@/types/messageRead";
const { auth, socialite } = endpoints;

const simplePaginate =
  <T>(url: string) =>
  (...args: any[]): Promise<AxiosResponse<SimplePaginate<T>>> =>
    http.get(`${url}/${args.join("/")}`);

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
    login: (
      email: string,
      password: string
    ): Promise<AxiosResponse<LoginResponse>> =>
      http.post(auth.login, { email, password }),
    logout: (): Promise<AxiosResponse<void>> => http.post(auth.logout),
    loadUser: (): Promise<AxiosResponse<LoginResponse>> => http.get(auth.user),
    broadcast: (
      socketID: string,
      channelName: string
    ): Promise<AxiosResponse<BroadcastAuthResponse>> =>
      http.post(auth.broadcast, {
        socket_id: socketID,
        channel_name: channelName,
      }),
  },
  socialite: {
    group: {
      loadAllIDs: (): Promise<
        AxiosResponse<{
          groups: number[];
        }>
      > => http.get(socialite.group.allIDs),
      message: {
        send: (
          group_id: number,
          body: string
        ): Promise<
          AxiosResponse<{
            message: Message | null;
          }>
        > =>
          http.post(socialite.group.message.restApi(group_id), {
            group_id,
            body,
          }),
        markAsRead: (groupID: number): Promise<AxiosResponse<void>> =>
          http.put(socialite.group.message.markAsRead(groupID)),
      },
      readList: (groupID: number): Promise<MessageRead[]> =>
        http.get(socialite.group.readList(groupID)),
    },
    friend: {
      request: {
        send: (
          recipient_id: number
        ): Promise<AxiosResponse<{ be_friend: boolean; group_id?: number }>> =>
          http.post(socialite.friend.request.send, { recipient_id }),
        accept: (
          sender_id: number
        ): Promise<AxiosResponse<{ group_id: number }>> =>
          http.post(socialite.friend.request.accept, { sender_id }),
        deny: (sender_id: number): Promise<AxiosResponse<void>> =>
          http.post(socialite.friend.request.deny, { sender_id }),
        revoke: (recipient_id: number): Promise<AxiosResponse<void>> =>
          http.delete(socialite.friend.request.revoke, {
            data: { recipient_id },
          }),
      },
      unfriend: (friend_id: number): Promise<AxiosResponse<void>> =>
        http.delete(socialite.friend.unfriend, { data: { friend_id } }),
    },
  },
  common: {
    simplePaginate: {
      init: <T>(
        url: string,
        ...args: any[]
      ): Promise<AxiosResponse<SimplePaginate<T>>> =>
        simplePaginate<T>(url)(...args),
      page: <T>(pageUrl: string): Promise<AxiosResponse<SimplePaginate<T>>> =>
        http.get(pageUrl),
    },
  },
};

export default api;
