import EventType from "@/config/events";

export default interface EventRegister {
  event: EventType;
  handle: (...args: any[]) => void;
}
