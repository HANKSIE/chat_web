import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-tw"; // import locale
dayjs.locale("zh-tw");
dayjs.extend(relativeTime);

export default class Day {
  public static relative(date: string) {
    return dayjs(date).fromNow();
  }
}
