import { defineStore } from "pinia";
import User from "@/types/user";

interface State {
  user: User | null;
}

const useAuthStore = defineStore("auth", {
  state: (): State => ({
    // user: {
    //   id: 1,
    //   name: "kevin",
    //   avatar_url: null,
    //   email: "kevin@gmail.com",
    // },
    user: null,
  }),
  actions: {
    set(user: User) {
      this.user = user;
    },
  },
});

export default useAuthStore;
