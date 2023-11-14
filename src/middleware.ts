import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const userData = request.cookies.get("user");
  const user = userData && JSON.parse(userData.value);
  
  // redirect unauthenticated users to signin page
  if (
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/academic") ||
      request.nextUrl.pathname.startsWith("/accounts") ||
      request.nextUrl.pathname.startsWith("/validation")) &&
    !token
  ) {
    // console.log("dont have token");
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // redirect authenticated users to dashboard
  if (token && request.nextUrl.pathname.startsWith("/auth")) {
    // console.log("have token");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
