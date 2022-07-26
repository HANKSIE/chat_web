import config from "@/config/pusher";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

class EchoManager {
  public static echo = EchoManager._build();

  private static _build() {
    return new Echo({
      broadcaster: "pusher",
      client: new Pusher(config.appKey, config.options),
    });
  }

  static rebuild() {
    EchoManager.echo.disconnect();
    EchoManager.echo = this._build();
  }
}

export default EchoManager;
