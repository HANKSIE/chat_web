import EventType from "@/config/events";
import router from "@/router";
import useAuthStore from "@/stores/auth";
import EventRegister from "@/types/eventRegister";

const register: EventRegister = {
  event: EventType.LOGOUT,
  handle: () => {
    const auth = useAuthStore();
    auth.$reset();
    router.push({ name: "login" });
  },
};

export default register;
