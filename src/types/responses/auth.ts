import User from "../user";

export type LoginResponse = {
  user: User;
};

export type RegisterResponse = LoginResponse;

export type BroadcastAuthResponse = {
  auth: string;
  channel_data: string;
};

export type SendForgotPasswordResetResponse = {
  status: string;
};
