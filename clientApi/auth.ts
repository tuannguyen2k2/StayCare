import {
  ILoginForm,
  ILoginResponse,
  IRefreshTokenResponse,
} from "@/interfaces/auth.interface";
import { convertBodyData } from "@/utils/helper";
import http from "@/utils/http";

export const authApi = {
  login: async (body: ILoginForm) => {
    return await http.post<ILoginResponse>(
      "/auth/login",
      convertBodyData({
        data: body,
        contentType: "multipart/form-data",
      }),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  },
     
  refreshToken: (refresh_token: string) =>
    http.post<IRefreshTokenResponse>(
      "/auth/new_access_token",
      JSON.stringify({ refresh_token })
    ),
};
