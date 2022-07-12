import { defineStore } from "pinia";
import Message from "@/types/message";
import endpoints from "@/config/endpoints";
import useSimplePaginate, {
  SimplePaginate,
} from "@/compositions/useSimplePaginate";
import { Unit } from "@/types/components/unitlist";
interface State {
  unit: Unit | null;
  simplePaginate: SimplePaginate<Message>;
  messages: Message[];
}

const useChatroomStore = defineStore("chatroom", {
  state: (): State => ({
    unit: null,
    simplePaginate: useSimplePaginate<Message>(
      endpoints.socialite.group.message.simplePaginate
    ),
    messages: [],
  }),
  actions: {
    async init(unit: Unit) {
      this.messages = [];
      this.unit = unit;
      this.unshiftMessage(...(await this.simplePaginate.search(unit.group_id)));
    },
    loadTop() {
      return this.simplePaginate.next();
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
