import EventType from "@/config/events";
import Listener from "@/types/listener";
import User from "@/types/user";
import EchoManager from "@/utils/echoManager";
import { joinGroup, leaveGroup } from "@/utils/socialite";

const listener: Listener = {
  event: EventType.SET_AUTH_USER,
  handle: (user: User) => {
    EchoManager.echo
      ?.private(`user.${user.id}`)
      .listen(".befriend", (data: { group_id: number }) => {
        joinGroup(data.group_id);
      })
      .listen(".unfriend", (data: { group_id: number }) => {
        leaveGroup(data.group_id);
      });
  },
};
export default listener;
