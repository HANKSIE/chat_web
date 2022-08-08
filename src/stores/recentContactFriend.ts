import { defineStore } from "pinia";
import endpoints from "@/config/endpoints";
import SimplePaginate from "@/utils/simplePaginate";
import RecentContactFriendData from "@/types/responses/socialite/friend/recentContactCursorPaginate";

interface State {
  data: RecentContactFriendData[];
}

const simplePaginate = new SimplePaginate<RecentContactFriendData>(
  endpoints.socialite.group.recentContactCursorPaginate
);

const useRecentContactFriendStore = defineStore("recentContactFriend", {
  state: (): State => ({
    data: [],
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
    // isOneToOne: 0 => false, 1 => true
    search: async (isOneToOne: number, perPage: number) =>
      await simplePaginate.search(isOneToOne, perPage),
    next: simplePaginate.next,
    markAsRead(groupID: number) {
      const data = this.data.find((d) => d.message.group_id === groupID);
      if (data) data!.unread = 0;
    },
  },
});

export default useRecentContactFriendStore;
