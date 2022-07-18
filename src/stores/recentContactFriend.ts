import { defineStore } from "pinia";
import endpoints from "@/config/endpoints";
import SimplePaginate from "@/utils/simplePaginate";
import Message from "@/types/message";

interface State {
  messages: Message[];
  simplePaginate: SimplePaginate<Message>;
}

const useRecentContactFriendStore = defineStore("recentContactFriend", {
  state: (): State => ({
    messages: [],
    simplePaginate: new SimplePaginate<Message>(
      endpoints.socialite.group.recentContactCursorPaginate
    ),
  }),
  actions: {
    clear() {
      this.messages = [];
    },
    push(...messages: Message[]) {
      this.messages.push(...messages);
    },
    unshift(...messages: Message[]) {
      this.messages.unshift(...messages);
    },
    update(message: Message) {
      const index = this.messages.findIndex(
        (msg) => msg.group!.id === message.group!.id
      );
      if (index !== -1) this.messages.splice(index, 1);
      this.messages.unshift(message);
    },
  },
});

export default useRecentContactFriendStore;
