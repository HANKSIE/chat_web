import { defineStore } from "pinia";
import endpoints from "@/config/endpoints";
import SimplePaginate from "@/utils/simplePaginate";
import User from "@/types/user";

interface FriendSimplePaginateData {
  user: User;
  group_id: number;
}

interface State {
  friends: FriendSimplePaginateData[];
}

const simplePaginate = new SimplePaginate<FriendSimplePaginateData>(
  endpoints.socialite.friend.simplePaginate
);

const useFriendStore = defineStore("friend", {
  state: (): State => ({
    friends: [],
  }),
  actions: {
    push(...users: FriendSimplePaginateData[]) {
      this.friends.push(...users);
    },
    unshift(...users: FriendSimplePaginateData[]) {
      this.friends.unshift(...users);
    },
    removeById(id: number) {
      this.friends = this.friends.filter((friend) => friend.user.id !== id);
    },
    search: async (perPage: number, keyword: string) =>
      await simplePaginate.search(perPage, keyword),
    next: simplePaginate.next,
  },
});

export default useFriendStore;
