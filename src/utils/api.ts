import http from "@/utils/http";
import {
  BroadcastAuthResponse,
  SendForgotPasswordResetResponse,
  LoginResponse,
} from "@/types/responses/auth";
import { AxiosResponse } from "axios";
import endpoints from "@/config/endpoints";
import Paginate from "@/types/paginate";
import Message from "@/types/message";
import MessageRead from "@/types/messageRead";
import Dict from "@/types/dict";
const { auth, socialite } = endpoints;

const paginate =
  <T>(url: string) =>
  (args: Dict<any>): Promise<AxiosResponse<Paginate<T>>> =>
    http.get(`${url}?${new URLSearchParams(args)}`);

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
    sendPasswordResetLink: (
      email: string
    ): Promise<AxiosResponse<SendForgotPasswordResetResponse>> =>
      http.post(auth.sendPasswordResetLink, { email }),

    resetPassword: (payload: {
      email: string;
      password: string;
      password_confirmation: string;
      token: string;
    }): Promise<AxiosResponse<SendForgotPasswordResetResponse>> =>
      http.post(auth.resetPassword, payload),
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
          http.post(socialite.group.message.markAsRead(groupID)),
      },
      messageReads: (
        groupID: number
      ): Promise<AxiosResponse<{ message_reads: MessageRead[] }>> =>
        http.get(socialite.group.messageReads(groupID)),
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
          http.post(socialite.friend.request.revoke, { recipient_id }),
      },
      unfriend: (friend_id: number): Promise<AxiosResponse<void>> =>
        http.post(socialite.friend.unfriend, { friend_id }),
    },
  },
  common: {
    paginate: {
      init: <T>(
        url: string,
        args: Dict<any>
      ): Promise<AxiosResponse<Paginate<T>>> => paginate<T>(url)(args),
      page: <T>(pageUrl: string): Promise<AxiosResponse<Paginate<T>>> =>
        http.get(pageUrl),
    },
  },
};

export default api;
