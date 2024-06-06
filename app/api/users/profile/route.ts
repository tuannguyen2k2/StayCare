import { IProfile } from "@/interfaces/profile.interface";
import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";

export async function GET() {
  const res = await http.get<BaseResponse<IProfile>>("/users/profile", {});
  console.log("profile api: ", res);

  if (res.status) {
    return Response.json(res.payload.data, { status: res.status });
  }

  return Response.json(res.payload, { status: 400 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  console.log("body", body);

  const res = await http.put<BaseResponse<any>>(
    "/users/profile",
    JSON.stringify(body)
  );
  if (res.status) {
    return Response.json(res.payload.data, { status: res.status });
  }
  return Response.json(res.payload, { status: 400 });
}
