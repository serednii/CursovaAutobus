// import type { AuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import Credentials from "next-auth/providers/credentials";
// import { prisma } from "@/prisma/prisma-client";

// type User = {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   password: string;
//   role: string;
//   phone: string;
//   license: string;
// };

// export const authConfig: AuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//     Credentials({
//       credentials: {
//         email: { label: "email", type: "email", required: true },
//         password: { label: "password", type: "password", required: true },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         console.log("***********************", user);

//         if (user && user.password === credentials.password) {
//           const { password, ...userWithoutPass } = user;
//           return userWithoutPass as User;
//         }

//         return null;
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/auth/signin",
//   },
// };

import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prisma-client";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  license: string;
};

export const authConfig: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // Перевірка пароля
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        // Видаляємо пароль перед поверненням користувача
        const { password, ...userWithoutPass } = user;

        // Зміна типу id на string
        const userData: User = {
          id: userWithoutPass.id.toString(),
          email: userWithoutPass.email,
          firstName: userWithoutPass.firstName,
          lastName: userWithoutPass.lastName,
          role: userWithoutPass.role,
          phone: userWithoutPass.phone,
          license: userWithoutPass.license,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },
};
