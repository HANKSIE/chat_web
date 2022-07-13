import EventType from "@/config/events";
import EventRegister from "@/types/eventRegister";
import EventManager from "@/utils/eventManager";

import register from "../register";
const registerAgain: EventRegister = {
  event: EventType.LOGOUT,
  handle: () => {
    EventManager.removeAllListener();
    register();
  },
};

export default registerAgain;
