import {
  CustomOptions,
  CustomResponse,
  EntityError,
  EntityErrorPayload,
  HttpError,
} from "@/interfaces/response.interface";
import { redirect } from "next/navigation";
import { CommonConstants, RequestMethods } from "../constants";
import { getAuthCookies, getServerAuthCookies } from "../cookies";

const getRequestURL = (url: string) => {
  if (!url.startsWith("/")) {
    url = "/" + url;
  }

  // server
  if (typeof window === "undefined") {
    return CommonConstants.apiUrl + url;
  }
  return CommonConstants.hostingUrl + `/api${url}`;
};

export const request = async <Response>(
  url: string,
  method: RequestMethods,
  options?: CustomOptions | undefined
): Promise<CustomResponse<Response>> => {
  let access_token;
  if (typeof window !== "undefined") {
    access_token = getAuthCookies().accessToken;
  } else {
    access_token = (await getServerAuthCookies()).accessToken?.value;
  }
  // access_token = getCookie("accessToken");

  // const allCookie = cookies().getAll();
  // console.log("this is all the cookie: ",allCookie);

  const body = options?.body;

  const baseHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: access_token ? `Bearer ${access_token}` : "",
  };

  const fullUrl = getRequestURL(url);

  const headers = new Headers({
    ...baseHeaders,
    ...options?.headers,
  });

  console.log("headers: ", {
    ...baseHeaders,
    ...options?.headers,
  });

  if (body instanceof FormData) {
    headers.delete("Content-Type");
  }

  // let parsedHeaders;
  // if (headers) {
  //   console.log("headers.entries(): ", headers.entries());
  //   parsedHeaders = Object.fromEntries(Array.from(headers.entries()));
  // }

  // console.log("parsedHeaders: ", parsedHeaders)

  // console.log("content-type: ", headers.get("Content-Type"));
  console.log("fullUrl: ", fullUrl);
  console.log("method: ", method);
  console.log("body: ", body);

  const res = await fetch(fullUrl, {
    method: method,
    headers: headers,
    body,
  });

  if (res.status >= 500) {
    throw new HttpError({
      status: res.status,
      payload: {
        code: res.status,
        message: "Internal Server Error",
      },
    });
  }
  console.log(res);

  const payload: Response = await res.json();

  const data = {
    ok: res.ok,
    status: res.status,
    payload,
  };

  if (typeof window === "undefined") {
  }

  console.log("data: ", payload);
  console.log("res status: ", res.status);

  if (!res.ok) {
    if (res.status === 422) {
      // console.log(data.payload);
      throw new EntityError(
        data.payload as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === 403 || res.status === 401) {
      redirect("/login");
      // const refresh_token = (await getServerAuthCookies()).refreshToken?.value;
      // if (refresh_token) {
      //   const res = await fetch(CommonConstants.hostingUrl + "/api/auth/refresh-token", {
      //     method: "POST",
      //     body: JSON.stringify({ refresh_token }),
      //     credentials: "include",
      //   });
      //   console.log("res: ", res);
      // const res = await authApi.refreshToken(refresh_token);
      // if (res.status === 201) {
      //   console.log("refresh token success");
      //   // await fetch(CommonConstants.hostingUrl + "/refresh-token", {
      //   //   method: "POST",
      //   //   headers: {
      //   //     "Content-Type": "application/json",
      //   //   },
      //   //   body: JSON.stringify({ access_token: res.payload.access_token }),
      //   // });
      //   const res = await fetch(CommonConstants.hostingUrl + "/refresh-token", {
      //     method: "GET",
      //     credentials: "include",
      //   });
      //   console.log("res: ", res);
      // } else {
      //   await fetch(CommonConstants.hostingUrl + "/logout", {
      //     method: "GET",
      //   });
      // }
      // }
    } else {
      throw new HttpError({
        status: res.status,
        payload: data.payload,
      });
      // return errorHandler<Response>(res);
    }
  }

  // if (["auth/login", "auth/register"].some((e) => e === normalizePath(url))) {
  //   setAuthCookies({
  //     access_token: (data.payload as ILoginResponse).access_token,
  //     refresh_token: (data.payload as ILoginResponse).refresh_token,
  //   });
  // }

  return data;
};

const http = {
  get: async <Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) => {
    const res = await request<Response>(url, "GET", options);
    // console.log("res if adsf : ", res);
    // if (!res.ok) {
    //   return errorHandler<Response>(
    //     url,
    //     "GET",
    //     res.status,
    //     options,
    //     res.payload
    //   );
    // }

    return res;
  },
  post: <Response>(
    url: string,
    body: any,
    options?: CustomOptions | undefined
  ) => request<Response>(url, "POST", { ...options, body }),
  put: <Response>(
    url: string,
    body: any,
    options?: CustomOptions | undefined
  ) => request<Response>(url, "PUT", { ...options, body }),
  delete: <Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) => request<Response>(url, "DELETE", { ...options, body }),
};

export default http;
