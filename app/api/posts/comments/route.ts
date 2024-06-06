import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const post_id = request.nextUrl.searchParams.get('post_id');

    const body = await request.json();
    const res = await http.post<BaseResponse<any>>(`/posts/comments/${post_id}`,JSON.stringify(body))

  if (res.status) {
    return Response.json(res.payload, { status: res.status });
  }
  return Response.json(res.payload, { status: 400 });
}