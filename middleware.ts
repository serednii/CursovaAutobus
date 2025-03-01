import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { RoleEnum } from "./enum/shared.enums";
import { prisma } from "@/prisma/prisma-client"; // Імпортуйте Prisma Client

export async function middleware(req: any) {
  const apiKey = req.headers.get("api-key"); // Отримуємо API ключ з заголовків
  const url = req.nextUrl.clone();
  console.log("middleware apiKey", url.pathname);
  // const callbackUrl = encodeURIComponent(url.pathname); // Зберігаємо поточний шлях для редиректу

  // Перевірка API ключа
  if (apiKey) {
    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (!user || apiKey === "f7db8c96-0ab3-434e-8741-cbabfc0342d5") {
      return NextResponse.json({ error: "Невірний API ключ" }, { status: 403 });
    }

    // Додаємо інформацію про користувача до запиту
    req.user = user;
  } else {
    // Якщо API ключ відсутній, перевіряємо авторизацію через NextAuth
    const token = await getToken({ req });

    if (!token) {
      // Якщо користувач не авторизований, перенаправляємо на сторінку входу
      if (
        url.pathname.startsWith("/protected") ||
        url.pathname.startsWith("/createroute") ||
        url.pathname.startsWith("/myroutes") ||
        url.pathname.startsWith("/mybookings") ||
        url.pathname.startsWith("/myprofile") ||
        url.pathname.startsWith("/passengerdashboard") ||
        url.pathname.startsWith("/seatselection")
      ) {
        url.pathname = "/signin";
        // url.searchParams.set("callbackUrl", callbackUrl); // Додаємо параметр для редиректу після авторизації
        return NextResponse.redirect(url);
      }
    } else {
      // Якщо користувач авторизований, перевіряємо доступ на основі ролей
      const urlRedirect = url.searchParams.get("callbackUrl"); // Отримуємо URL після авторизації

      if (
        url.pathname.startsWith("/signin") ||
        url.pathname.startsWith("/selectrole") ||
        url.pathname.startsWith("/registerdriver") ||
        url.pathname.startsWith("/registerpassenger") ||
        (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/createroute")) ||
        (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/myroutes")) ||
        (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/myroute"))
      ) {
        if (url.pathname.startsWith("/createroute")) {
          url.pathname = urlRedirect ? decodeURIComponent(urlRedirect) : "/createroute/0";
        }
        url.pathname = urlRedirect ? decodeURIComponent(urlRedirect) : "/";

        url.searchParams.delete("callbackUrl"); // Видаляємо параметр, щоб він не передавався далі
        return NextResponse.redirect(url);
      } else {
        if (url.pathname === "/createroute") {
          url.pathname = urlRedirect ? decodeURIComponent(urlRedirect) : "/createroute/0";
          url.searchParams.delete("callbackUrl"); // Видаляємо параметр, щоб він не передавався далі
          return NextResponse.redirect(url);
        }
      }
    }
  }

  // Якщо все в порядку, продовжуємо виконання
  return NextResponse.next();
}

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import { RoleEnum } from "./enum/shared.enums";

// export async function middleware(req: any) {
//   const token = await getToken({ req });
//   const url = req.nextUrl.clone();
//   const callbackUrl = encodeURIComponent(url.pathname); // Зберігаємо поточний шлях

//   if (token) {
//     const urlRedirect = url.searchParams.get("callbackUrl"); // Отримуємо URL після авторизації

//     if (
//       url.pathname.startsWith("/signin") ||
//       url.pathname.startsWith("/selectrole") ||
//       url.pathname.startsWith("/registerdriver") ||
//       url.pathname.startsWith("/registerpassenger") ||
//       (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/createroute")) ||
//       (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/myroutes")) ||
//       (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/myroute"))
//     ) {
//       url.pathname = urlRedirect ? decodeURIComponent(urlRedirect) : "/";
//       url.searchParams.delete("callbackUrl"); // Видаляємо параметр, щоб він не передавався далі
//       return NextResponse.redirect(url);
//     }
//   } else {
//     if (
//       url.pathname.startsWith("/protected") ||
//       url.pathname.startsWith("/createroute") ||
//       url.pathname.startsWith("/myroutes") ||
//       url.pathname.startsWith("/mybookings") ||
//       url.pathname.startsWith("/myprofile") ||
//       url.pathname.startsWith("/passengerdashboard") ||
//       url.pathname.startsWith("/seatselection")
//     ) {
//       url.pathname = "/signin";
//       url.searchParams.set("callbackUrl", callbackUrl); // Додаємо параметр для редиректу після авторизації
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }
