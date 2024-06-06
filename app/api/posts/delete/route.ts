import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";


export async function DELETE(request: NextRequest) {
    const searchParams = await request.nextUrl.searchParams.get('post_id');
    const res = await http.delete<BaseResponse<any>>(`/posts/${searchParams}`,  {});
    if (res.status) {
        return Response.json(res.payload, { status: res.status });
    }
    return Response.json(res.payload, { status: 400 });
}
