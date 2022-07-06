import User from "../user";

type LoginResponse = {
  user: User;
};

type RegisterResponse = LoginResponse;

type BroadcastAuthResponse = {
  auth: string;
  channel_data: string;
};

export type { LoginResponse, RegisterResponse, BroadcastAuthResponse };
