import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  // if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
  //   // console.log("dont have token");
  //   return NextResponse.redirect(new URL("/auth/signin", request.url));
  // }
}
