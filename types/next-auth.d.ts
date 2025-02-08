import NextAuth from "next-auth";
import { RoleEnum } from "@/enum/shared.enums";

export interface UserDataBase {
  id: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: RoleEnum;
  license: string;
}

export interface UserSession {
  id: string;
  email: string;
  name?: string;
  image?: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
  phone: string;
  license: string;
  isNewUser: boolean;
  avatar_url?: string;
}

// export interface UserSelect {
//   id?: boolean;
//   email?: boolean;
//   firstName?: boolean;
//   lastName?: boolean;
//   role?: boolean;
//   phone?: boolean;
//   license?: boolean;
//   createdAt?: boolean;
// }

// Визначення типу для вибіркових полей
export type UserSelect = {
  [key in keyof Omit<UserSession, "name" | "image">]?: boolean;
} & {
  createdAt?: boolean;
};

export interface IUser
  extends Omit<
    UserSession,
    "role" | "name" | "image" | "isNewUser" | "license"
  > {}

export interface SessionData {
  data: {
    expires: string;
    user: Omit<UserSession, "name" | "image">;
  };
}

declare module "next-auth" {
  interface Session {
    user: UserSession;
  }

  interface User extends Omit<UserSession, "email" | "name" | "image"> {}
}
