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
    search(perPage: number, keyword: string) {
      return simplePaginate.search(perPage, keyword);
    },
    next() {
      return simplePaginate.next();
    },
    clear() {
      this.friends = [];
    },
    push(...users: FriendSimplePaginateData[]) {
      this.friends.push(...users);
    },
    unshift(...users: FriendSimplePaginateData[]) {
      this.friends.unshift(...users);
    },
  },
});

export default useFriendStore;
