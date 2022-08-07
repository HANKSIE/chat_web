import ChattableUnit from "@/types/chattableUnit";
import Message from "@/types/message";
import User from "@/types/user";

import useChatroomStore from "../stores/chatroom";
import EchoManager from "./echoManager";
import EventManager from "./eventManager";

export const switchChatroom = (unit: ChattableUnit) => {
  const chatRoomStore = useChatroomStore();
  chatRoomStore.init(unit);
  EventManager.dispatch(EventManager.EventType.SWITCH_CHATROOM, unit);
};

export const joinGroup = (groupID: number) => {
  EchoManager.echo
    ?.join(`group.${groupID}`)
    .here((users: User[]) =>
      EventManager.dispatch(EventManager.EventType.JOIN_GROUP, users)
    )
    .joining((user: User) =>
      EventManager.dispatch(EventManager.EventType.MEMBER_JOIN_GROUP, user)
    )
    .leaving((user: User) =>
      EventManager.dispatch(EventManager.EventType.MEMBER_LEAVE_GROUP, user)
    )
    .listen(".message", (data: { message: Message }) =>
      EventManager.dispatch(
        EventManager.EventType.RECEIVE_GROUP_MESSAGE,
        data.message
      )
    );
};

export const leaveGroup = (groupID: number) => {
  EchoManager.echo?.leave(`group.${groupID}`);
};
