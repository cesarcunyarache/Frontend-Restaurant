import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

  const jwt = request.cookies.get("token");

  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("83837849399292/**//")
    );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
