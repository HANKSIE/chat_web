import { defineStore } from "pinia";
import User from "@/types/user";

interface State {
  user: User | null;
}

const useAuthStore = defineStore("auth", {
  state: (): State => ({
    user: null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    removeUser() {
      this.user = null;
    },
  },
});

export default useAuthStore;
