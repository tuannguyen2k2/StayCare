import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const res = await http.put<BaseResponse<any>>("/users/password/changing", JSON.stringify(body));
  if (res.status) {
    return Response.json(res.payload.data, { status: res.status });
  }
  return Response.json(res.payload, { status: 400 });
}
