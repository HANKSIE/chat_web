import EventType from "@/config/events";
import router from "@/router";
import useAuthStore from "@/stores/auth";
import useChatroomStore from "@/stores/chatroom";
import useFriendStore from "@/stores/friend";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import Listener from "@/types/listener";

const listener: Listener = {
  event: EventType.LOGOUT,
  handle: () => {
    const auth = useAuthStore();
    const chatroomStore = useChatroomStore();
    const friendStore = useFriendStore();
    const recentContactFriendStore = useRecentContactFriendStore();
    auth.$reset();
    router.push({ name: "login" });
    chatroomStore.$reset();
    friendStore.$reset();
    recentContactFriendStore.$reset();
  },
};

export default listener;
