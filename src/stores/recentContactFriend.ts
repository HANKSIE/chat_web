import { defineStore } from "pinia";
import endpoints from "@/config/endpoints";
import SimplePaginate from "@/utils/simplePaginate";
import Message from "@/types/message";
import RecentContactFriendData from "@/types/responses/socialite/friend/recentContactCursorPaginate";

interface State {
  data: RecentContactFriendData[];
  simplePaginate: SimplePaginate<RecentContactFriendData>;
}

const useRecentContactFriendStore = defineStore("recentContactFriend", {
  state: (): State => ({
    data: [],
    simplePaginate: new SimplePaginate<RecentContactFriendData>(
      endpoints.socialite.group.recentContactCursorPaginate
    ),
  }),
  actions: {
    clear() {
      this.data = [];
    },
    push(...data: RecentContactFriendData[]) {
      this.data.push(...data);
    },
    unshift(...data: RecentContactFriendData[]) {
      this.data.unshift(...data);
    },
    update(data: RecentContactFriendData) {
      const index = this.data.findIndex(
        (d) => d.message.group_id === data.message.group_id
      );
      if (index !== -1) this.data.splice(index, 1);
      this.data.unshift(data);
    },
  },
});

export default useRecentContactFriendStore;
