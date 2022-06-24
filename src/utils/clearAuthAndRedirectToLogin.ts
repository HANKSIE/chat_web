import router from "@/router";
import useAuthStore from "@/stores/auth";

export default function () {
  const auth = useAuthStore();
  auth.removeUser();
  router.push({ name: "login" });
}
