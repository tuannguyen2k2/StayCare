import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    const searchParams = await request.nextUrl.searchParams;
    const queryString = new URLSearchParams(searchParams).toString();
    const res = await http.get<BaseResponse<any>>(`/posts/search?${queryString}`,  {});
    if (res.status) {
        return Response.json(res.payload, { status: res.status });
    }
    return Response.json(res.payload, { status: 400 });
}
