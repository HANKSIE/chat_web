import EventType from "@/config/events";
import Listener from "@/types/listener";
import MessageRead from "@/types/messageRead";
import { isCurrentChatroom } from "@/utils/socialite";

const listener: Listener = {
  event: EventType.MEMBER_MARK_AS_READ,
  handle: async (messageRead: MessageRead) => {
    if (isCurrentChatroom(messageRead.group_id)) console.log(messageRead);
  },
};

export default listener;
