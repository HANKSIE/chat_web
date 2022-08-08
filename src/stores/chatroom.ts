import { defineStore } from "pinia";
import Message from "@/types/message";
import endpoints from "@/config/endpoints";
import ChattableUnit from "@/types/chattableUnit";
import SimplePaginate from "@/utils/simplePaginate";
import MessageRead from "@/types/messageRead";
interface State {
  unit: ChattableUnit | null;
  messages: Message[];
  messageReads: MessageRead[];
  cursorPaginate?: SimplePaginate<Message>;
}

const useChatroomStore = defineStore("chatroom", {
  state: (): State => ({
    unit: null,
    messages: [],
    messageReads: [],
    cursorPaginate: undefined,
  }),
  actions: {
    init(unit?: ChattableUnit) {
      this.messages = [];
      this.unit = unit || null;
      this.cursorPaginate = unit
        ? new SimplePaginate<Message>(
            endpoints.socialite.group.message.cursorPaginate(
              this.unit!.group_id
            )
          )
        : undefined;
    },
    push(...messages: Message[]) {
      this.messages.push(...messages.slice().reverse());
    },
    unshift(...messages: Message[]) {
      this.messages.unshift(...messages.slice().reverse());
    },
    search(perPage: number) {
      return this.cursorPaginate!.search(perPage);
    },
    loadTop() {
      return this.cursorPaginate!.next();
    },
  },
});

export default useChatroomStore;
