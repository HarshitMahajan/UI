import { NextResponse, type NextRequest } from "next/server";

/**
 * Registry auth. The shadcn CLI fetches /r/*.json. When REGISTRY_TOKEN is set,
 * requests must send "Authorization: Bearer <token>". Unset = open (local dev).
 */
export function proxy(request: NextRequest) {
  const token = process.env.REGISTRY_TOKEN;
  if (!token || request.headers.get("authorization") === `Bearer ${token}`) {
    return NextResponse.next();
  }
  return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });
}

export const config = { matcher: ["/r/:path*"] };
