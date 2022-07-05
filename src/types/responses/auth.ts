import User from "../user";

export type LoginResponse = {
  user: User;
};

export type BroadcastAuthResponse = {
  auth: string;
  channel_data: string;
};
