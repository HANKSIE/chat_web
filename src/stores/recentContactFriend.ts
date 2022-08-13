import { defineStore } from "pinia";
import endpoints from "@/config/endpoints";
import Paginate from "@/utils/paginate";
import RecentContactPaginateData from "@/types/responses/socialite/recentContactPaginateData";
import api from "@/utils/api";

interface State {
  data: RecentContactPaginateData[];
}

const paginate = new Paginate<RecentContactPaginateData>(
  endpoints.socialite.group.recentContactPaginate
);

const useRecentContactFriendStore = defineStore("recentContactFriend", {
  state: (): State => ({
    data: [],
  }),
  actions: {
    clear() {
      this.data = [];
    },
    push(...data: RecentContactPaginateData[]) {
      this.data.push(...data);
    },
    unshift(...data: RecentContactPaginateData[]) {
      this.data.unshift(...data);
    },
    update(data: RecentContactPaginateData) {
      const index = this.data.findIndex(
        (d) => d.message.group_id === data.message.group_id
      );
      if (index !== -1) this.data.splice(index, 1);
      this.data.unshift(data);
    },
    search: async (isOneToOne: boolean, perPage: number) =>
      await paginate.search({ is_one_to_one: isOneToOne, per_page: perPage }),
    next: paginate.next,
    async markAsRead(groupID: number) {
      await api.socialite.group.message.markAsRead(groupID);
      const data = this.data.find((d) => d.message.group_id === groupID);
      if (data) data!.unread = 0;
    },
  },
});

export default useRecentContactFriendStore;
