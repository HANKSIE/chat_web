import EventManager from "@/utils/eventManager";

const registers = [
  import("./listeners/setAuthAndRedirectToDashboard"),
  import("./listeners/clearAuthAndRedirectToLogin"),
  import("./listeners/echo/joinGroups"),
  import("./listeners/echo/leaveGroups"),
];

export default async () => {
  const results = await Promise.all(registers);
  results.forEach((register) => {
    const { event, handle } = register.default;
    EventManager.on(event, handle);
  });
};
