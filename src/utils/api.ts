import http from "@/utils/http";
import { LoginResponse } from "@/types/responses/auth";
import { AxiosResponse } from "axios";

const api = {
  login(
    email: string,
    password: string
  ): Promise<AxiosResponse<LoginResponse>> {
    return http.post("login", { email, password });
  },
  logout(): Promise<AxiosResponse<void>> {
    return http.post("logout");
  },
  loadUser(): Promise<AxiosResponse<LoginResponse>> {
    return http.get("user");
  },
};

export default api;
