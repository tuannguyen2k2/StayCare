import { ISignUpResponse } from "@/interfaces/auth.interface";
import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const role = request.nextUrl.searchParams.get('role');
  const res = await http.post<BaseResponse<ISignUpResponse>>(
    `/users/${role}/registration`,
    JSON.stringify(body)
  );

  if (res.status) {
    // setAuthCookies(res.payload.data);
    return Response.json(res.payload.data, { status: res.status });
  }

  return Response.json(res.payload, { status: 400 });
}
