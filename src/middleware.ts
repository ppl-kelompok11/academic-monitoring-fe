import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // redirect unauthenticated users to signin page
  const token = request.cookies.get("token");
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
}
