import EventType from "@/config/events";
import Listener from "@/types/listener";
import EventManager from "@/utils/eventManager";
import register from "../register";

const listener: Listener = {
  event: EventType.LOGOUT,
  handle: () => {
    EventManager.removeAllListener();
    register();
  },
};

export default listener;
