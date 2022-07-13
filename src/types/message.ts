import User from "./user";

export default interface Message {
  id: number;
  body: string;
  created_at: string;
  group_id: number;
  user?: User;
}
