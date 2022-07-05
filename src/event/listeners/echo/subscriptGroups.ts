import EventType from "@/config/events";
import EventRegister from "@/types/eventRegister";
import api from "@/utils/api";
import echo from "@/utils/echo";
const register: EventRegister = {
  event: EventType.LOGIN,
  handle: () => {
    api.socialite.group.loadAllIDs().then((res) => {
      res.data.groups.forEach((id) =>
        echo.join(`group.${id}`).listen(".message", (e: any) => {
          console.log(e);
        })
      );
    });
  },
};
export default register;
