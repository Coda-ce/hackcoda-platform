import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
      if (isAuth) {
        if (token.role === "ADMIN") {
          return NextResponse.redirect(new URL("/adm", req.url));
        }
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
      );
    }

    // Role-based Access Control
    if (req.nextUrl.pathname.startsWith("/adm") && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const isAuthPage =
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/register");

        // Permite acesso público a login/register e arquivos estáticos
        if (isAuthPage) return true;

        // Exige autenticação para o resto (incluindo dashboard e adm)
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/adm/:path*", "/login", "/register"],
};
