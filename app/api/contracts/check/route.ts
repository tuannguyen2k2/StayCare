
import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import dayjs from "dayjs";
import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {

  const body = await request.json();
  body.start_date = dayjs(body.start_date).format('YYYY-MM-DD');
    
  const res = await http.post<BaseResponse<any>>(`/contracts/check`,JSON.stringify(body), {
  });

    
  if (res.status) {
  
    return Response.json(res.payload.data, { status: res.status });
  }

  return Response.json(res.payload, { status: 400 });
}
