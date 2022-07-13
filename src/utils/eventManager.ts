import EventEmitter from "eventemitter3";
import EventType from "@/config/events";

class EventManager {
  public static EventType = EventType;
  private static _emitter = new EventEmitter();
  static dispatch(type: EventType, ...args: any[]) {
    return EventManager._emitter.emit(type.toString(), ...args);
  }
  static on(type: EventType, listener: (...args: any[]) => void) {
    return EventManager._emitter.on(type.toString(), listener);
  }
  static removeAllListener() {
    EventManager._emitter.removeAllListeners();
  }
}

export default EventManager;
