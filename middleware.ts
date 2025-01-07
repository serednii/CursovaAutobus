export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/passenger/:path*", "/protected/:path*", "/driver/:path*"],
};
