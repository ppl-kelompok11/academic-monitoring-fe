import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

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
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (user?.role_id == 1) {
      return NextResponse.rewrite(new URL("/dashboard/operator", request.url));
    } else if (user?.role_id == 2) {
      return NextResponse.rewrite(new URL("/dashboard/student", request.url));
    } else if (user?.role_id == 3) {
      return NextResponse.rewrite(new URL("/dashboard/lecturer", request.url));
    } else if (user?.role_id == 4) {
      return NextResponse.rewrite(
        new URL("/dashboard/department", request.url)
      );
    }
  }

  // rewrite profile based on user role
  if (request.nextUrl.pathname.endsWith("/profile")) {
    if (user?.role_id == 1) {
      return NextResponse.rewrite(new URL("/profile/operator", request.url));
    } else if (user?.role_id == 2) {
      return NextResponse.rewrite(new URL("/profile/student", request.url));
    } else if (user?.role_id == 3) {
      return NextResponse.rewrite(new URL("/profile/lecturer", request.url));
    } else if (user?.role_id == 4) {
      return NextResponse.rewrite(new URL("/profile/department", request.url));
    }
  }

  // rewrite profile edit based on user role
  if (request.nextUrl.pathname.endsWith("/profile/edit")) {
    if (user?.role_id == 1) {
      return NextResponse.rewrite(
        new URL("/profile/operator/edit", request.url)
      );
    } else if (user?.role_id == 2) {
      return NextResponse.rewrite(
        new URL("/profile/student/edit", request.url)
      );
    } else if (user?.role_id == 3) {
      return NextResponse.rewrite(
        new URL("/profile/lecturer/edit", request.url)
      );
    } else if (user?.role_id == 4) {
      return NextResponse.rewrite(
        new URL("/profile/department/edit", request.url)
      );
    }
  }

  if (request.nextUrl.pathname.endsWith("/academic")) {
    return NextResponse.redirect(new URL("/academic/irs", request.url));
  }

  if (request.nextUrl.pathname.endsWith("/recap")) {
    return NextResponse.redirect(new URL("/recap/pkl", request.url));
  }

  if (request.nextUrl.pathname.endsWith("/accounts")) {
    return NextResponse.redirect(new URL("/accounts/student", request.url));
  }

  // redirect to initial data page if user is not active
  if (
    user?.role_id == 2 &&
    !user?.active &&
    token &&
    (request.nextUrl.pathname.startsWith("/academic") ||
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/initial-data", request.url));
  }

  if (
    user?.active &&
    token &&
    request.nextUrl.pathname.startsWith("/initial-data")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
