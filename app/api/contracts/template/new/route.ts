import { ILoginResponse } from "@/interfaces/auth.interface";
import { IContractUpdate } from "@/interfaces/contract.interface";
import { BaseResponse } from "@/interfaces/response.interface";
import { setServerAuthCookies } from "@/utils/cookies";
import http from "@/utils/http";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  
    
  const res = await http.post<BaseResponse<IContractUpdate>>(`/contracts/template/new?contract_id=${request.nextUrl.searchParams.get("contract_id")}`, body, {});

    
  if (res.status) {
  
    return Response.json(res.payload.data, { status: res.status });
  }

  return Response.json(res.payload, { status: 400 });
}
