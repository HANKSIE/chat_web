import Chatroom from "@/views/Chatroom.vue";
import Dashboard from "@/views/Dashboard.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: Dashboard,
    children: [{ path: "chatroom", component: Chatroom }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
