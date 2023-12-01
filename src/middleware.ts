import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from 'js-cookie';

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
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // redirect to dashboard based on user role
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (user?.role_id == 1) {
      return NextResponse.rewrite(new URL('/dashboard/operator', request.url))
    } else if (user?.role_id == 2) {
      return NextResponse.rewrite(new URL('/dashboard/student', request.url))
    } else if (user?.role_id == 3) {
      return NextResponse.rewrite(new URL('/dashboard/lecturer', request.url))
    } else if (user?.role_id == 4) {
      return NextResponse.rewrite(new URL('/dashboard/department', request.url))
    }
  }

  // redirect to initial data page if user is not active
  if (
    (!user?.active && token) &&
    (request.nextUrl.pathname.startsWith("/academic") ||
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/initial-data", request.url));
  }

  if (user?.active && token && request.nextUrl.pathname.startsWith("/initial-data")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

const activeStudentRoutes = [
  "/academic",
  "/accounts",
  "/validation",
  "/profile",
];
