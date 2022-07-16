import ChattableUnit from "@/types/chattableUnit";

import useChatroomStore from "../stores/chatroom";
import EventManager from "./eventManager";

export const switchChatroom = (unit: ChattableUnit) => {
  const chatRoomStore = useChatroomStore();
  chatRoomStore.init(unit);
  EventManager.dispatch(EventManager.EventType.SWITCH_CHATROOM);
};
