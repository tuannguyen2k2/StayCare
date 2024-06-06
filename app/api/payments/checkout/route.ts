
import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import dayjs from "dayjs";
import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {

  const body = await request.json();
    console.log("body in ra di ma",body);
    
    
  const res = await http.post<BaseResponse<any>>(`/payments/checkout`,JSON.stringify(body), {
    headers: {
        "Content-Type": "application/json", 
        
    }
  });

    
  if (res.status) {
  
    return Response.json(res.payload.data, { status: res.status });
  }

  return Response.json(res.payload, { status: 400 });
}
