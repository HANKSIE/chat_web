import EventType from "@/config/events";
import useAuthStore from "@/stores/auth";
import useChatroomStore from "@/stores/chatroom";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import Listener from "@/types/listener";
import Message from "@/types/message";
import { isCurrentChatroom, isMe } from "@/utils/socialite";

const recentContactFriendStore = useRecentContactFriendStore();

const listener: Listener = {
  event: EventType.RECEIVE_GROUP_MESSAGE,
  handle: (message: Message) => {
    const chatroomStore = useChatroomStore();
    const is_current_chatroom = isCurrentChatroom(message.group_id);
    const is_me = isMe(message.user?.id);
    if (message.group?.is_one_to_one) {
      const record = recentContactFriendStore.data.find(
        (data) => data.message.group_id === message.group_id
      );
      const unread = record ? record.unread : 0;

      recentContactFriendStore.update({
        message,
        unread: is_current_chatroom || is_me ? 0 : unread + 1,
      });
      if (!is_me && is_current_chatroom) {
        if (chatroomStore.unit?.is_one_to_one)
          useRecentContactFriendStore().markAsRead(message.group_id);
      }
    }
  },
};

export default listener;
