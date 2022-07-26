import EventType from "@/config/events";
import Listener from "@/types/listener";
import EchoManager from "@/utils/echoManager";
const listener: Listener = {
  event: EventType.LOGOUT,
  handle: () => {
    EchoManager.rebuild();
  },
};

export default listener;
