import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      firstName: string;
      lastName: string;
      role: string;
      phone: string;
      license: string;
      isNewUser: boolean;
    };
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    license: string;
    isNewUser: boolean;
  }
}
