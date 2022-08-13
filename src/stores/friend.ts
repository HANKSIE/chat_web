import { defineStore } from "pinia";
import endpoints from "@/config/endpoints";
import Paginate from "@/utils/Paginate";
import User from "@/types/user";

interface FriendPaginateData {
  user: User;
  group_id: number;
}

interface State {
  friends: FriendPaginateData[];
}

const paginate = new Paginate<FriendPaginateData>(
  endpoints.socialite.friend.paginate
);

const useFriendStore = defineStore("friend", {
  state: (): State => ({
    friends: [],
  }),
  actions: {
    push(...users: FriendPaginateData[]) {
      this.friends.push(...users);
    },
    unshift(...users: FriendPaginateData[]) {
      this.friends.unshift(...users);
    },
    removeById(id: number) {
      this.friends = this.friends.filter((friend) => friend.user.id !== id);
    },
    search: async (perPage: number, keyword: string) =>
      await paginate.search({ q: keyword, per_page: perPage }),
    next: paginate.next,
  },
});

export default useFriendStore;
