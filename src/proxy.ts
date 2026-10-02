import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Single auth read: also refreshes the session cookies when expired,
  // which Server Components rely on to read auth state. Reused below.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /admin/* routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login page without auth
    if (request.nextUrl.pathname === "/admin/login") {
      // If already authenticated, check if admin
      if (user) {
        const role = (user.app_metadata?.role as string) || "user";
        if (role === "admin") {
          // Redirect admin away from login page to admin dashboard
          return NextResponse.redirect(new URL("/admin", request.url));
        }
        // Non-admin authenticated user - redirect to homepage
        return NextResponse.redirect(new URL("/", request.url));
      }
      // Not authenticated - allow access to login page
      return response;
    }

    // All other /admin/* routes require authentication
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin role
    const role = (user.app_metadata?.role as string) || "user";
    if (role !== "admin") {
      // Authenticated but not admin - redirect to homepage
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Admin user - allow access
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all admin routes:
     * /admin
     * /admin/login
     * /admin/messages
     * /admin/messages/:id
     * etc.
     */
    "/admin/:path*",
  ],
};