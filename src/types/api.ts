import { BroadcastAuthResponse, LoginResponse } from "@/types/responses/auth";
import { AxiosResponse } from "axios";

export default interface Api {
  auth: {
    login(
      email: string,
      password: string
    ): Promise<AxiosResponse<LoginResponse>>;
    logout(): Promise<AxiosResponse<void>>;
    loadUser(): Promise<AxiosResponse<LoginResponse>>;
    broadcast(
      socketID: string,
      channelName: string
    ): Promise<AxiosResponse<BroadcastAuthResponse>>;
  };
  socialite: {
    group: {
      loadAllIDs(): Promise<
        AxiosResponse<{
          groups: number[];
        }>
      >;
    };
  };
}
