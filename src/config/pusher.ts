import api from "@/utils/api";
import env from "@/utils/env";
import { Options } from "pusher-js";

interface PusherConfig {
  appKey: string;
  options: Options;
}

const config: PusherConfig = {
  appKey: env("VITE_PUSHER_APP_KEY"),
  options: {
    wsHost: env("VITE_PUSHER_HOST", "127.0.0.1"),
    wsPort: env("VITE_PUSHER_PORT", 6001),
    forceTLS: false,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authorizer: (channel) => {
      return {
        authorize: async (socketID: string, callback) => {
          try {
            const res = await api.auth.broadcast(socketID, channel.name);
            callback(null, res.data);
          } catch (err) {
            console.error(err);
            callback(err as Error, null);
          }
        },
      };
    },
  },
};

export default config;
