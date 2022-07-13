import { defineStore } from "pinia";
import Message from "@/types/message";
import endpoints from "@/config/endpoints";
import { Unit } from "@/types/components/unitlist";
import SimplePaginate from "@/utils/simplePaginate";
interface State {
  unit: Unit | null;
  simplePaginate: SimplePaginate<Message>;
  messages: Message[];
}

const useChatroomStore = defineStore("chatroom", {
  state: (): State => ({
    unit: null,
    simplePaginate: new SimplePaginate<Message>(
      endpoints.socialite.group.message.simplePaginate
    ),
    messages: [],
  }),
  actions: {
    init(unit: Unit) {
      this.messages = [];
      this.unit = unit;
    },
    pushMessage(...messages: Message[]) {
      this.messages.push(...messages.slice().reverse());
    },
    unshiftMessage(...messages: Message[]) {
      this.messages.unshift(...messages.slice().reverse());
    },
  },
});

export default useChatroomStore;
