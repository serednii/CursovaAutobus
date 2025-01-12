import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
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
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    license: string;
    isNewUser: boolean;
  }
}
