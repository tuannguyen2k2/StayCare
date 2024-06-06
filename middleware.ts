import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CommonConstants, CookiesConstant } from "./utils/constants";
import {
  ResponseCookies,
  RequestCookies,
} from "next/dist/server/web/spec-extension/cookies";

const privatePaths = CommonConstants.path.private;
const authPaths = CommonConstants.path.auth;

function applySetCookie(req: NextRequest, res: NextResponse) {
  // 1. Parse Set-Cookie header from the response
  const setCookies = new ResponseCookies(res.headers);

  // 2. Construct updated Cookie header for the request
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
  //    on a dummy response
  // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
  const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });

  // 4. Copy the “request header overrides” headers from our dummy response to the real response
  dummyRes.headers.forEach((value, key) => {
    if (
      key === "x-middleware-override-headers" ||
      key.startsWith("x-middleware-request-")
    ) {
      res.headers.set(key, value);
    }
  });
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const accessToken = request.cookies.get(CookiesConstant.accessToken);

  // Check if the its the refresh token route
  // if (pathName.startsWith("/refresh-token")) {
  //   const body = await request.json();
  //   console.log(body);
  //   console.log("middleware", request);
  //   // resetServerAccessCookies("accessToken")
  //   const response = NextResponse.next();
  //   // response.cookies.set("some", "new token");
  //   response.cookies.set(CookiesConstant.accessToken, "new-token");
  //   console.log("middleware response", response);
  //   applySetCookie(request, response);
  //   return response;
  //   // return NextResponse.next();
  // }

  //   Check if the path is private and the user is not authenticated
  if (privatePaths.some((path) => pathName.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   Check if the path is for authenticated users only and the user is authenticated
  if (authPaths.some((path) => pathName.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/sign-up", "/profile"],
};
