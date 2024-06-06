import { IRefreshTokenResponse } from "@/interfaces/auth.interface";
import http from "@/utils/http";
import { cookies } from "next/headers";
import { getCookies, setCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await http.post<IRefreshTokenResponse>(
    "/auth/new_access_token",
    JSON.stringify(body)
  );

  console.log("res in api route: ", res);

  if(res.status) {
    console.log("res.payload: ", res.payload);
    const response = NextResponse.json(res.payload, { status: res.status });
    setCookie("newToken", "somevalue", {
      req: request,
      res: response,
    });
    return response;
  }
}
