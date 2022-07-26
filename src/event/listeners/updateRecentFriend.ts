import EventType from "@/config/events";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import Listener from "@/types/listener";
import RecentContactFriendData from "@/types/responses/socialite/friend/recentContactCursorPaginate";

const recentContactFriendStore = useRecentContactFriendStore();

const listener: Listener = {
  event: EventType.RECEIVE_GROUP_MESSAGE,
  handle: (data: RecentContactFriendData) => {
    if (data.message.group!.is_one_to_one) {
      recentContactFriendStore.update(data);
    }
  },
};

export default listener;
