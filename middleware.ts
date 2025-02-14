import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { RoleEnum } from "./enum/shared.enums";

export async function middleware(req: any) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();
  // console.log("token token", token);
  // console.log("url url", url);

  // Якщо є токен (користувач залогінений)
  if (token) {
    // Закриваємо доступ до сторінок для авторизованих користувачів
    if (
      url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/selectrole") ||
      url.pathname.startsWith("/registerdriver") ||
      url.pathname.startsWith("/registerpassenger") ||
      (token.role === RoleEnum.PASSENGER &&
        url.pathname.startsWith("/createroute")) ||
      (token.role === RoleEnum.PASSENGER &&
        url.pathname.startsWith("/myroutes")) ||
      (token.role === RoleEnum.PASSENGER && url.pathname.startsWith("/myroute"))
    ) {
      url.pathname = "/"; // Перенаправлення на головну сторінку
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
      url.pathname = "/signin"; // Перенаправлення на сторінку входу
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
