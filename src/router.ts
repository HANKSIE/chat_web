import Chatroom from "@/views/Chatroom.vue";
import Dashboard from "@/views/layouts/Dashboard.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import NotFound from "@/views/NotFound.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import useAuthStore from "./stores/auth";
import api from "./utils/api";
import EventManager from "./utils/eventManager";
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    meta: {
      redirectWhenAuth: true,
    },
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    meta: {
      redirectWhenAuth: true,
    },
    component: Register,
  },
  {
    path: "/forgot-password",
    name: "forgot.password",
    meta: {
      redirectWhenAuth: true,
    },
    component: ForgotPassword,
  },
  {
    path: "/reset-password/:token",
    name: "reset.password",
    meta: {
      redirectWhenAuth: true,
    },
    component: ResetPassword,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      requireAuth: true,
    },
    children: [
      { path: "chatroom", name: "chatroom", component: Chatroom },
      {
        path: "/:pathMatch(.*)*",
        component: NotFound,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    component: NotFound,
  },
  {
    path: "/",
    redirect: { name: "login" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const { requireAuth, redirectWhenAuth } = to.matched[0].meta;
  const auth = useAuthStore();

  if (auth.user === null) {
    try {
      const res = await api.auth.loadUser();
      const { user } = res.data;
      if (user) EventManager.dispatch(EventManager.EventType.LOGIN, user);
    } catch (err) {
      console.error(err);
    }
  }

  if (redirectWhenAuth && auth.user !== null) return next({ name: "chatroom" });

  if (requireAuth && auth.user === null) return next({ name: "login" });

  return next();
});

export default router;
