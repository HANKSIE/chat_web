import EventType from "@/config/events";
import router from "@/router";
import useAuthStore from "@/stores/auth";
import Listener from "@/types/listener";
import User from "@/types/user";
import EventManager from "@/utils/eventManager";

const listener: Listener = {
  event: EventType.LOGIN,
  handle: (user: User) => {
    const auth = useAuthStore();
    auth.set(user);
    EventManager.dispatch(EventType.SET_AUTH_USER, user);
    router.push({ name: "chatroom" });
  },
};

export default listener;
