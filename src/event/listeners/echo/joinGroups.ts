import EventType from "@/config/events";
import EventRegister from "@/types/eventRegister";
import Message from "@/types/message";
import User from "@/types/user";
import api from "@/utils/api";
import EchoManager from "@/utils/echoManager";
import EventManager from "@/utils/eventManager";
const register: EventRegister = {
  event: EventType.LOGIN,
  handle: () => {
    const echo = EchoManager.connect();
    api.socialite.group.loadAllIDs().then((res) => {
      res.data.groups.forEach((id) =>
        echo
          .join(`group.${id}`)
          .here((users: User[]) =>
            EventManager.dispatch(EventType.JOIN_GROUP, users)
          )
          .joining((user: User) =>
            EventManager.dispatch(EventType.MEMBER_JOIN_GROUP, user)
          )
          .leaving((user: User) =>
            EventManager.dispatch(EventType.MEMBER_LEAVE_GROUP, user)
          )
          .listen(".message", (data: { message: Message }) =>
            EventManager.dispatch(EventType.RECEIVE_GROUP_MESSAGE, data.message)
          )
      );
    });
  },
};
export default register;
