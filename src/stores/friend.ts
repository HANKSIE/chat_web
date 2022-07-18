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
  simplePaginate: SimplePaginate<FriendSimplePaginateData>;
}

const useFriendStore = defineStore("friend", {
  state: (): State => ({
    friends: [],
    simplePaginate: new SimplePaginate<FriendSimplePaginateData>(
      endpoints.socialite.friend.simplePaginate
    ),
  }),
  actions: {
    clear() {
      this.friends = [];
    },
    push(...users: FriendSimplePaginateData[]) {
      this.friends.push(...users);
    },
    unshift(...users: FriendSimplePaginateData[]) {
      this.friends.unshift(...users);
    },
    remove(id: number) {
      this.friends = this.friends.filter((friend) => friend.user.id !== id);
    },
  },
});

export default useFriendStore;
