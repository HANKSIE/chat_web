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
      recentContactPaginate: "groups/recent-contact/search",
      message: {
        paginate: (groupID: number) => `group/${groupID}/messages/search`,
        restApi: (groupID: number) => `group/${groupID}/messages`,
        markAsRead: (groupID: number) =>
          `group/${groupID}/message/mark-as-read`,
      },
      messageReads: (groupID: number) => `group/${groupID}/message-reads`,
    },
    friend: {
      paginate: "friends/search",
      request: {
        send: "friends/request/send",
        accept: "friends/request/accept",
        deny: "friends/request/deny",
        revoke: "friends/request/revoke",
      },
      unfriend: "friends",
      requests: {
        paginate: "friends/requests/search",
      },
    },

    user: {
      paginate: "users/search",
    },
  },
};
