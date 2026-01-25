import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("sb-access-token")?.value;
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.redirect(new URL("/login", req.url));

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
