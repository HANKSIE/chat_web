import { defineStore } from "pinia";
import Message from "@/types/message";

interface State {
  groupID: number;
  messages: Message[];
}

const useChatroomStore = defineStore("chatroom", {
  state: (): State => ({
    groupID: -1,
    messages: [],
  }),
  actions: {
    addMessage(message: Message) {
      this.messages = [...this.messages, message];
    },
  },
});

export default useChatroomStore;
