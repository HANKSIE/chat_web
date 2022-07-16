import EventType from "@/config/events";
import Listener from "@/types/listener";
import api from "@/utils/api";
import { joinGroup } from "@/utils/socialite";

const listener: Listener = {
  event: EventType.LOGIN,
  handle: () => {
    api.socialite.group.loadAllIDs().then((res) => {
      res.data.groups.forEach((id) => joinGroup(id));
    });
  },
};
export default listener;
