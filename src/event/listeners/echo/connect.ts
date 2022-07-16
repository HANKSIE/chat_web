import EventType from "@/config/events";
import Listener from "@/types/listener";
import EchoManager from "@/utils/echoManager";

const listener: Listener = {
  event: EventType.LOGIN,
  handle: () => EchoManager.connect(),
};
export default listener;
