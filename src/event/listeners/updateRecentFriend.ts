import EventType from "@/config/events";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import Listener from "@/types/listener";
import Message from "@/types/message";

const recentContactFriendStore = useRecentContactFriendStore();

const listener: Listener = {
  event: EventType.RECEIVE_GROUP_MESSAGE,
  handle: (message: Message) => {
    console.log("message: ", message);
    if (message.group!.is_one_to_one) {
      recentContactFriendStore.update(message);
    }
  },
};

export default listener;
