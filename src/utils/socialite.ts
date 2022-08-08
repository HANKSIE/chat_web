import useAuthStore from "@/stores/auth";
import ChattableUnit from "@/types/chattableUnit";
import Message from "@/types/message";
import MessageRead from "@/types/messageRead";
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
    )
    .listen(".mark-as-read", (data: { messageRead: MessageRead }) =>
      EventManager.dispatch(
        EventManager.EventType.MEMBER_MARK_AS_READ,
        data.messageRead
      )
    );
};

export const leaveGroup = (groupID: number) => {
  EchoManager.echo?.leave(`group.${groupID}`);
};

export const isCurrentChatroom = (groupID: number) =>
  useChatroomStore().unit?.group_id === groupID;
export const isMe = (userID: number) => userID === useAuthStore().user?.id;
