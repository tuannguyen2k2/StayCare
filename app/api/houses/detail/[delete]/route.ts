import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";


export async function DELETE(request: NextRequest) {

    const body = await request.json();
  
    const res = await http.delete<BaseResponse<any>>(`/houses/detail/${body.id_}`, body, {});
    if (res.status) {
        return Response.json(res.payload, { status: res.status });
    }
    return Response.json(res.payload, { status: 400 });
}
export async function PUT(request: NextRequest) {
    const body = await request.json();
    const url = request.nextUrl.pathname;
    let parts = url.split("/");
    const id = parts[parts.length - 1];
    const res = await http.put<BaseResponse<any>>(`/houses/detail/${id}`, JSON.stringify(body), {});
    if (res.status) {
        return Response.json(res.payload, { status: res.status });
    }
    return Response.json(res.payload, { status: 400 });
}