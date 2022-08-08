import EventType from "@/config/events";
import useAuthStore from "@/stores/auth";
import useChatroomStore from "@/stores/chatroom";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import Listener from "@/types/listener";
import Message from "@/types/message";
import api from "@/utils/api";

const recentContactFriendStore = useRecentContactFriendStore();

const listener: Listener = {
  event: EventType.RECEIVE_GROUP_MESSAGE,
  handle: (message: Message) => {
    const isCurrentChatroom =
      useChatroomStore().unit?.group_id === message.group_id;
    const isMe = message.user.id === useAuthStore().user?.id;
    if (message.group?.is_one_to_one) {
      const record = recentContactFriendStore.data.find(
        (data) => data.message.group_id === message.group_id
      );
      const unread = record ? record.unread : 0;

      recentContactFriendStore.update({
        message,
        unread: isCurrentChatroom || isMe ? 0 : unread + 1,
      });
      if (!isMe && isCurrentChatroom)
        api.socialite.group.message.markAsRead(message.group_id);
    }
  },
};

export default listener;
