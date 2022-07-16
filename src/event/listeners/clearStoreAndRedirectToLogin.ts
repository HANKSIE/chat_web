import EventType from "@/config/events";
import router from "@/router";
import useAuthStore from "@/stores/auth";
import useChatroomStore from "@/stores/chatroom";
import Listener from "@/types/listener";

const listener: Listener = {
  event: EventType.LOGOUT,
  handle: () => {
    const auth = useAuthStore();
    const chatroomStore = useChatroomStore();
    auth.$reset();
    chatroomStore.$reset();
    router.push({ name: "login" });
  },
};

export default listener;
