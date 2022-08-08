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
      recentContactCursorPaginate: "groups/recent-contact",
      message: {
        simplePaginate: (groupID: number) => `group/${groupID}/messages/search`,
        restApi: (groupID: number) => `group/${groupID}/messages`,
        markAsRead: (groupID: number) =>
          `group/${groupID}/message/mark-as-read`,
        cursorPaginate: (groupID: number) =>
          `group/${groupID}/messages/paginate`,
      },
    },
    friend: {
      simplePaginate: "friends/search",
      request: {
        send: "friends/request/send",
        accept: "friends/request/accept",
        deny: "friends/request/deny",
        toMe: "friends/requests/receive",
        fromMe: "friends/requests/sent",
        revoke: "friends/request/revoke",
      },
      unfriend: "friends",
    },

    user: {
      simplePaginate: "users/search",
    },
  },
};
