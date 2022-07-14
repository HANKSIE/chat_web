export default {
  auth: {
    register: "register",
    login: "login",
    logout: "logout",
    user: "user",
    broadcast: "broadcasting/auth",
  },
  csrf: "sanctum/csrf-cookie",
  socialite: {
    group: {
      allIDs: "groups",
      message: {
        simplePaginate: "messages/search",
        restApi: "messages",
      },
      recentContactCursorPaginate: "groups/recent-contact",
    },
    friend: {
      simplePaginate: "friends/search",
    },
  },
};
