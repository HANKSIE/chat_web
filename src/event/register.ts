import EventManager from "@/utils/eventManager";

const registers = [
  import("./listeners/logout"),
  import("./listeners/echo/subscriptGroups"),
];

export default async () => {
  const results = await Promise.all(registers);
  results.forEach((register) => {
    const { event, handle } = register.default;
    EventManager.on(event, handle);
  });
};
