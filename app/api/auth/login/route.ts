import { ILoginResponse } from "@/interfaces/auth.interface";
import { setServerAuthCookies } from "@/utils/cookies";
import http from "@/utils/http";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.formData();

  const res = await http.post<ILoginResponse>("/auth/login", body, {});
  console.log("res: ", res);
  if (res.status) {
    setServerAuthCookies(res.payload);
    return Response.json(res.payload, { status: res.status });
  }

  return Response.json(res.payload, { status: 400 });
}
