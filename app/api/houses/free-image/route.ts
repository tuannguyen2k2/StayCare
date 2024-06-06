import { BaseResponse } from "@/interfaces/response.interface";
import http from "@/utils/http";
import { NextRequest } from "next/server";
interface IFreeImage {
    file: File[] | [];
    
}
export async function POST(request: NextRequest) {
  const body = await request.formData();
  
    
  const res = await http.post<BaseResponse<IFreeImage>>("/houses/free-image", body, {
    headers: {
        "Content-Type": "multipart/form-data",
      },
  });
   
    
  if (res.status) {
 
    return Response.json(res.payload.data, { status: res.status });
  }

  return Response.json(res.payload, { status: 400 });
}
