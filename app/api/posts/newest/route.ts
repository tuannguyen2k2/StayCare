import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // const body = await request.json();
  const res = await http.get<BaseResponse<any>>("/posts/newest?page=1&limit=1", {});
  if (res.status) {
    return Response.json(res.payload, { status: res.status });
  }
  return Response.json(res.payload, { status: 400 });
}
