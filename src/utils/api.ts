import http from "@/utils/http";
import {
  BroadcastAuthResponse,
  SendForgotPasswordResetResponse,
  LoginResponse,
} from "@/types/responses/auth";
import { AxiosResponse } from "axios";
import endpoints from "@/config/endpoints";
import Message from "@/types/message";
import MessageRead from "@/types/messageRead";
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
      loadAllIDs: () =>
        http.get<{
          groups: number[];
        }>(socialite.group.allIDs),
      message: {
        send: (group_id: number, body: string) =>
          http.post<{
            message: Message | null;
          }>(socialite.group.message.restApi(group_id), {
            group_id,
            body,
          }),
        markAsRead: (groupID: number) =>
          http.post<void>(socialite.group.message.markAsRead(groupID)),
      },
      messageReads: (groupID: number) =>
        http.get<{ message_reads: MessageRead[] }>(
          socialite.group.messageReads(groupID)
        ),
    },
    friend: {
      request: {
        send: (recipient_id: number) =>
          http.post<{ be_friend: boolean; group_id?: number }>(
            socialite.friend.request.send,
            { recipient_id }
          ),
        accept: (sender_id: number) =>
          http.post<{ group_id: number }>(socialite.friend.request.accept, {
            sender_id,
          }),
        deny: (sender_id: number) =>
          http.post<void>(socialite.friend.request.deny, { sender_id }),
        revoke: (recipient_id: number) =>
          http.post<void>(socialite.friend.request.revoke, { recipient_id }),
      },
      unfriend: (friend_id: number) =>
        http.post<void>(socialite.friend.unfriend, { friend_id }),
    },
  },
};

export default api;
