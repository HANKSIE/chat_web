import EventType from "@/config/events";
import Listener from "@/types/listener";
import Message from "@/types/message";
import { isCurrentChatroom } from "@/utils/socialite";
import { Notify } from "quasar";
import { switchChatroom } from "@/utils/socialite";
import bot from "@/assets/imgs/bot.png";

const listener: Listener = {
  event: EventType.RECEIVE_GROUP_MESSAGE,
  handle: async (message: Message) => {
    if (isCurrentChatroom(message.group_id)) return;

    if (message.group?.is_one_to_one) {
      const friend = message.group!.members![0];

      Notify.create({
        message: `${message.user?.name ?? "系統訊息"} : ${message.body}`,
        avatar: message.user ? message.user?.avatar_url ?? undefined : bot,
        position: "top-right",
        group: message.group_id,
        actions: [
          {
            label: "查看",
            handler() {
              switchChatroom({
                id: friend.id,
                name: friend.name,
                avatar_url: friend.avatar_url,
                group_id: message.group_id,
                is_one_to_one: true,
              });
            },
          },
        ],
      });
    }
  },
};

export default listener;
