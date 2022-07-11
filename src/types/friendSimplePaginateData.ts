import Message from "./message";
import User from "./user";

export default interface FriendSimplePaginateData {
  user: User;
  group_id: number;
  latest_message: Message;
}
