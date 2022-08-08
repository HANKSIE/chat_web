import EventManager from "@/utils/eventManager";

const listeners = [
  import("./listeners/removeAllListenerAndRegisterAgain"),
  import("./listeners/setAuthAndRedirectToDashboard"),
  import("./listeners/clearStoreAndRedirectToLogin"),
  import("./listeners/echo/joinGroups"),
  import("./listeners/echo/leaveGroups"),
  import("./listeners/echo/listenUserChannel"),
  import("./listeners/updateRecentFriend"),
  import("./listeners/markAsRead"),
  import("./listeners/updateChatroomMessageReadList"),
];

export default async () => {
  const results = await Promise.all(listeners);
  results.forEach((listener) => {
    const { event, handle } = listener.default;
    EventManager.on(event, handle);
  });
};
