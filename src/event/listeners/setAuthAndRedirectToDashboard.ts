import EventType from "@/config/events";
import router from "@/router";
import useAuthStore from "@/stores/auth";
import EventRegister from "@/types/eventRegister";
import User from "@/types/user";

const register: EventRegister = {
  event: EventType.LOGIN,
  handle: (user: User) => {
    const auth = useAuthStore();
    auth.set(user);
    router.push({ name: "chatroom" });
  },
};

export default register;
