import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";


export async function PUT(request: NextRequest) {
    const body = await request.json();
    const searchParams = await request.nextUrl.searchParams.get('slug');
    const res = await http.put<BaseResponse<any>>(`/posts/${searchParams}`, JSON.stringify(body));
    if (res.status) {
        return Response.json(res.payload, { status: res.status });
    }
    return Response.json(res.payload, { status: 400 });
}
