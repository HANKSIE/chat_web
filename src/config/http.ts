import clearAuthAndRedirectToLogin from "@/utils/clearAuthAndRedirectToLogin";
import env from "@/utils/env";
import endpoints from "./endpoints";

export default {
  requestConfig: {
    baseURL: env("VITE_BACKEND_URL"),
    withCredentials: true,
  },
  //Don't redirect when unauthentication
  dontRedirects: [endpoints.auth.user],
  csrfTokenName: "XSRF-TOKEN",
  unauthHandle: clearAuthAndRedirectToLogin,
};
