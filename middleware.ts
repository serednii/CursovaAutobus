import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { RoleEnum } from "./enum/shared.enums";
let urlSearch = "";
export async function middleware(req: any) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();
  // console.log("token token", token);
  // console.log("url url", url);
  const callbackUrl = encodeURIComponent(url.pathname); // Зберігаємо поточний шлях
  // console.log("callbackUrl", callbackUrl);
  // Якщо є токен (користувач залогінений)
  if (token) {
    // const urlRedirect = urlSearch.replaceAll("%2F", "/");
    // console.log("callbackUrl", callbackUrl);
    // if (callbackUrl.includes("seatselection")) {
    //   url.searchParams.delete("callbackUrl"); // Видаляємо параметр, щоб він не передавався далі
    //   // return NextResponse.redirect(
    //   //   new URL(decodeURIComponent(callbackUrl), req.url)
    //   // );
    //   url.pathname = callbackUrl;
    //   return NextResponse.redirect(url);
    // }
    // console.log("is token ", url.search, urlRedirect);
    // Закриваємо доступ до сторінок для авторизованих користувачів
    if (
      url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/selectrole") ||
      url.pathname.startsWith("/registerdriver") ||
      url.pathname.startsWith("/registerpassenger") ||
      (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/createroute")) ||
      (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/myroutes")) ||
      (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/myroute"))
    ) {
      // url.pathname = urlRedirect ? decodeURIComponent(urlRedirect) : "/";
      url.pathname = "/"; // Перенаправлення на головну сторінку
      // url.searchParams.delete("callbackUrl"); // Видаляємо параметр, щоб він не передавався далі
      return NextResponse.redirect(url);
    }
  } else {
    // Якщо користувач не авторизований, закриваємо доступ до захищених сторінок
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
      url.searchParams.set("callbackUrl", callbackUrl); // Додаємо параметр для редиректу після авторизації
      return NextResponse.redirect(url);
    }
  }

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
//       (token.role === RoleEnum.PASSENGER &&
//         url.pathname.startsWith("/createroute")) ||
//       (token.role === RoleEnum.PASSENGER &&
//         url.pathname.startsWith("/myroutes")) ||
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
