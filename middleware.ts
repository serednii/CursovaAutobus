// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/passenger/:path*", "/protected/:path*", "/driver/:path*"],
// };

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  // Якщо є токен (користувач залогінений)
  if (token) {
    // Закриваємо доступ до сторінок для неавторизованих користувачів
    if (
      url.pathname.startsWith("/auth") ||
      url.pathname.startsWith("/auth/signin") ||
      url.pathname.startsWith("/auth/role") ||
      url.pathname.startsWith("/auth/driver") ||
      url.pathname.startsWith("/auth/passenger")
    ) {
      url.pathname = "/"; // Перенаправлення на головну сторінку
      return NextResponse.redirect(url);
    }
  } else {
    // Якщо користувач не авторизований, закриваємо доступ до захищених сторінок
    if (
      url.pathname.startsWith("/protected") ||
      url.pathname.startsWith("/passenger") ||
      url.pathname.startsWith("/driver")
    ) {
      url.pathname = "/auth/signin"; // Перенаправлення на сторінку входу
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
