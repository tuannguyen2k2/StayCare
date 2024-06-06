import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";


export async function PUT(request: NextRequest) {
    const searchParams = await request.nextUrl.searchParams.get('comment_id');
    const res = await http.put<BaseResponse<any>>(`/posts/like?comment_id=${searchParams}`,{});
    if (res.status) {
        return Response.json(res.payload, { status: res.status });
    }
    return Response.json(res.payload, { status: 400 });
}
