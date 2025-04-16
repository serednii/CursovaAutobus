import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { RoleEnum } from "./enum/shared.enums";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export async function middleware(req: any) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req });
  // console.log("token", token);
  // console.log("Request URL:", req);
  const { pathname } = req.nextUrl;
  const apiKey = token?.apiKey;
  console.log("midlevare pathname apiKey", pathname, token?.apiKey);

  // if (apiKey !== process.env.NEXT_PUBLIC_API_KEY && pathname.includes("/api")) {
  //   return NextResponse.json({ message: "Невірний API ключ" }, { status: 403 });
  // }

  // Якщо токен відсутній
  if (!token) {
    const protectedPaths = [
      "/createroute",
      "/myroutes",
      "/mybookings",
      "/myprofile",
      "/seatselection",
    ];

    if (protectedPaths.some((path) => pathname.includes(path))) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  } else {
    const urlRedirect = url.searchParams.get("callbackUrl");

    if (
      ["/signin", "/selectrole", "/registerdriver", "/registerpassenger"].some((path) =>
        pathname.includes(path)
      ) ||
      (["/createroute", "/myroutes", "/myroute"].some((path) => pathname.includes(path)) &&
        token.role !== RoleEnum.DRIVER)
    ) {
      url.pathname = urlRedirect ? decodeURIComponent(urlRedirect) : "/";
      url.searchParams.delete("callbackUrl");
      return NextResponse.redirect(url);
    }
  }

  // Пропуск API запитів без перевірки сесії
  if (pathname.includes("/api/")) {
    return NextResponse.next();
  }

  // Обробка i18n роутів
  const localizedResponse = i18nRouter(req, i18nConfig);
  if (localizedResponse) return localizedResponse;

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
