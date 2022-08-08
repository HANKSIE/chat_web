import EventType from "@/config/events";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import ChattableUnit from "@/types/chattableUnit";
import Listener from "@/types/listener";
import api from "@/utils/api";

const listener: Listener = {
  event: EventType.SWITCH_CHATROOM,
  handle: async (unit: ChattableUnit) => {
    await api.socialite.message.markAsRead(unit.group_id);
    if (unit.is_one_to_one)
      useRecentContactFriendStore().markAsRead(unit.group_id);
  },
};

export default listener;
