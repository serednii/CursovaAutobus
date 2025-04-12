// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import { RoleEnum } from "./enum/shared.enums";
// import { prisma } from "@/prisma/prisma-client";
// import { i18nRouter } from "next-i18n-router";
// import i18nConfig from "./i18nConfig";

// export async function middleware(req: any) {
//   // Локалізація маршруту
//   const localizedResponse = i18nRouter(req, i18nConfig);
//   if (localizedResponse) return localizedResponse;

//   const apiKey = req.headers.get("api-key");
//   const url = req.nextUrl.clone();
//   console.log("middleware apiKey", url.pathname);

//   // Перевірка API ключа
//   if (apiKey) {
//     const user = await prisma.user.findUnique({ where: { apiKey } });
//     if (!user || apiKey === "f7db8c96-0ab3-434e-8741-cbabfc0342d5") {
//       return NextResponse.json({ error: "Невірний API ключ" }, { status: 403 });
//     }
//     req.user = user;
//   } else {
//     // Перевірка авторизації через NextAuth
//     const token = await getToken({ req });
//     if (!token) {
//       if (["/protected", "/createroute", "/myroutes", "/mybookings", "/myprofile", "/seatselection"].some((path) => url.pathname.startsWith(path))) {
//         url.pathname = "/signin";
//         return NextResponse.redirect(url);
//       }
//     } else {
//       const urlRedirect = url.searchParams.get("callbackUrl");
//       if (
//         ["/signin", "/selectrole", "/registerdriver", "/registerpassenger"].some((path) => url.pathname.startsWith(path)) ||
//         (token.role === RoleEnum.PASSENGER && ["/createroute", "/myroutes", "/myroute"].some((path) => url.pathname.startsWith(path)))
//       ) {
//         url.pathname = urlRedirect ? decodeURIComponent(urlRedirect) : "/";
//         url.searchParams.delete("callbackUrl");
//         return NextResponse.redirect(url);
//       }
//       if (url.pathname === "/createroute") {
//         url.pathname = urlRedirect ? decodeURIComponent(urlRedirect) : "/createroute/0/type";
//         url.searchParams.delete("callbackUrl");
//         return NextResponse.redirect(url);
//       }
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/((?!api|static|.*\\..*|_next).*)",
// };

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { RoleEnum } from "./enum/shared.enums";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export async function middleware(req: any) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req });
  console.log("Request URL:", req.url);
  const { pathname } = req.nextUrl;

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
    // Якщо токен є — перевірка на роль
    const urlRedirect = url.searchParams.get("callbackUrl");

    if (
      ["/signin", "/selectrole", "/registerdriver", "/registerpassenger"].some((path) =>
        pathname.includes(path)
      ) ||
      (["createroute", "myroutes", "myroute"].some((path) => pathname.includes(path)) &&
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
