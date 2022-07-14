import Message from "./message";
import User from "./user";

interface Group {
  id: number;
  name: string;
  is_one_to_one: boolean;
  avatar_url: string | null;
  members?: User[];
  messages?: Message[];
}

export default Group;
