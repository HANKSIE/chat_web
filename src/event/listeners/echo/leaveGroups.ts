import EventType from "@/config/events";
import EventRegister from "@/types/eventRegister";
import EchoManager from "@/utils/echoManager";
const register: EventRegister = {
  event: EventType.LOGOUT,
  handle: () => {
    EchoManager.destroy();
  },
};

export default register;
