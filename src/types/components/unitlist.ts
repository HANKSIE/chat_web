import Message from "../message";

export interface Unit {
  id: number;
  name: string;
  avatar_url: string | null;
  group_id: number;
  latest_message?: Message;
}
