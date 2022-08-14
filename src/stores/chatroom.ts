import { defineStore } from "pinia";
import Message from "@/types/message";
import endpoints from "@/config/endpoints";
import ChattableUnit from "@/types/chattableUnit";
import Paginate from "@/utils/paginate";
import MessageRead from "@/types/messageRead";
import api from "@/utils/api";
interface State {
  unit: ChattableUnit | null;
  messages: Message[];
  messageReads: MessageRead[];
  paginate?: Paginate<Message>;
}

const useChatroomStore = defineStore("chatroom", {
  state: (): State => ({
    unit: null,
    messages: [],
    messageReads: [],
    paginate: undefined,
  }),
  actions: {
    async init(unit?: ChattableUnit) {
      this.messages = [];
      this.unit = unit || null;
      this.paginate = unit
        ? new Paginate<Message>(
            endpoints.socialite.group.message.paginate(unit!.group_id)
          )
        : undefined;
      this.messageReads = unit
        ? await (
            await api.socialite.group.messageReads(unit!.group_id)
          ).data.message_reads
        : [];
    },
    push(...messages: Message[]) {
      this.messages.push(...messages.slice().reverse());
    },
    unshift(...messages: Message[]) {
      this.messages.unshift(...messages.slice().reverse());
    },
    search(perPage: number) {
      return this.paginate!.search({ per_page: perPage });
    },
    loadTop() {
      return this.paginate!.next();
    },
    updateMessageReads(messageRead: MessageRead) {
      const index = this.messageReads.findIndex(
        (msr) => msr.user_id === messageRead.user_id
      );
      index === -1
        ? this.messageReads.push(messageRead)
        : this.messageReads.splice(index, 1, messageRead);
    },
  },
  getters: {
    messageReadCount: (state) => (messageID: number) =>
      state.messageReads.filter((messageRead) =>
        messageRead.message_id == null
          ? false
          : messageRead.message_id >= messageID
      ).length,
  },
});

export default useChatroomStore;
