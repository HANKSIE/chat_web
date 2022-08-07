import { defineStore } from "pinia";
import Message from "@/types/message";
import endpoints from "@/config/endpoints";
import ChattableUnit from "@/types/chattableUnit";
import SimplePaginate from "@/utils/simplePaginate";
interface State {
  unit: ChattableUnit | null;
  messages: Message[];
}

const simplePaginate = new SimplePaginate<Message>(
  endpoints.socialite.group.message.simplePaginate
);

const useChatroomStore = defineStore("chatroom", {
  state: (): State => ({
    unit: null,
    messages: [],
  }),
  actions: {
    init(unit?: ChattableUnit) {
      this.messages = [];
      this.unit = unit || null;
    },
    push(...messages: Message[]) {
      this.messages.push(...messages.slice().reverse());
    },
    unshift(...messages: Message[]) {
      this.messages.unshift(...messages.slice().reverse());
    },
    search(perPage: number) {
      return simplePaginate.search(this.unit?.group_id, perPage);
    },
    loadTop() {
      return simplePaginate.next();
    },
  },
});

export default useChatroomStore;
