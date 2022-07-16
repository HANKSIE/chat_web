import EventType from "@/config/events";

export default interface Listener {
  event: EventType;
  handle: (...args: any[]) => void;
}
