import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const body = await request.json();

    const res = await http.post<BaseResponse<any>>("/houses", JSON.stringify(body));
    if (res.status) {
        return Response.json(res.payload, { status: res.status });
    }
    return Response.json(res.payload, { status: 400 });
}
export async function DELETE(request: NextRequest) {
 
    
    const searchParams = await request.nextUrl.searchParams.get('id_');
    const res = await http.delete<BaseResponse<any>>(`/houses?id_=${searchParams}`,  {});
    if (res.status) {
        return Response.json(res.payload, { status: res.status });
    }
    return Response.json(res.payload, { status: 400 });
}


