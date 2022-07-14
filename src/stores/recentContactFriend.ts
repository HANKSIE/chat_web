import { defineStore } from "pinia";
import endpoints from "@/config/endpoints";
import SimplePaginate from "@/utils/simplePaginate";
import Message from "@/types/message";

interface State {
  messages: Message[];
}

const simplePaginate = new SimplePaginate<Message>(
  endpoints.socialite.group.recentContactCursorPaginate
);

const useRecentContactFriendStore = defineStore("recentContactFriend", {
  state: (): State => ({
    messages: [],
  }),
  actions: {
    search(perPage: number) {
      return simplePaginate.search(1, perPage);
    },
    next() {
      return simplePaginate.next();
    },
    clear() {
      this.messages = [];
    },
    push(...messages: Message[]) {
      this.messages.push(...messages);
    },
    unshift(...messages: Message[]) {
      this.messages.unshift(...messages);
    },
  },
});

export default useRecentContactFriendStore;
