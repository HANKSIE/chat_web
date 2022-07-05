import config from "@/config/pusher";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default new Echo({
  broadcaster: "pusher",
  client: new Pusher(config.appKey, config.options),
});
