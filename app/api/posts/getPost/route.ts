import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, ) {
    const searchParams = await request.nextUrl.searchParams.get('slug');;
    const res = await http.get<BaseResponse<any>>(`/posts/${searchParams}`,  {});
    if (res.status) {
        return Response.json(res.payload, { status: res.status });
    }
    return Response.json(res.payload, { status: 400 });
}