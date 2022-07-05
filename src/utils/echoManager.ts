import config from "@/config/pusher";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

class EchoManager {
  public static echo: Echo | null;

  static rebuild() {
    EchoManager.echo = new Echo({
      broadcaster: "pusher",
      client: new Pusher(config.appKey, config.options),
    });
    return EchoManager.echo;
  }

  static destroy() {
    EchoManager.echo?.disconnect();
    EchoManager.echo = null;
  }
}

export default EchoManager;
