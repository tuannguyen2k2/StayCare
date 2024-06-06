import http from "@/utils/http";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.formData();

  const res = await http.post("/posts", body, {});

  if (res.status) {
    return Response.json(res.payload, { status: res.status });
  }
  return Response.json(res.payload, { status: 400 });
}
