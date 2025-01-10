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
  isNewUser: boolean;
};

export const authConfig: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      async profile(profile) {
        // Після авторизації через GitHub, ми отримуємо email
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        // Якщо користувач є в базі, додаємо його дані до профілю
        if (!user) {
          profile.isNewUser = true; // Помітити нового користувача
          // console.log("11111");
        } else {
          // console.log("22222");
          profile.id = user.id;
          profile.firstName = user.firstName;
          profile.lastName = user.lastName || "";
          profile.role = user.role;
          profile.phone = user.phone;
          profile.license = user.license || "no license";
          profile.isNewUser = false; // Користувач знайдений
        }
        return profile;
      },
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

        const { password, ...userWithoutPass } = user;

        const userData: User = {
          id: userWithoutPass.id.toString(),
          email: userWithoutPass.email,
          firstName: userWithoutPass.firstName,
          lastName: userWithoutPass.lastName || "",
          role: userWithoutPass.role,
          phone: userWithoutPass.phone,
          license: userWithoutPass.license || "no license",
          isNewUser: false, // Не новий користувач
        };

        // console.log("userData === ", userData);

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/complete-profile", // Сторінка для заповнення профілю
  },

  callbacks: {
    async session({ session, token }) {
      // console.log("session user ", session);
      // console.log("session token", token);

      // Якщо користувач увійшов через GitHub
      if (token.github) {
        session.user.isNewUser = token.isNewUser as boolean; // Додаємо до сесії
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as string;
        session.user.phone = token.phone as string;
        session.user.license = token.license as string;
        session.user.email = token.email as string; // Додаємо email з GitHub
      } else if (token.email) {
        // Якщо це звичайна авторизація через email та password
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as string;
        session.user.phone = token.phone as string;
        session.user.license = token.license as string;
        session.user.isNewUser = token.isNewUser as boolean;
      }
      // setTimeout(() => {
      //   console.log("*********************");
      //   console.log("*********************");
      //   console.log("*********************");
      //   console.log("*********************");
      //   console.log("*********************");
      // }, 4000);

      return session;
    },

    async jwt({ token, user }) {
      // console.log("jwt user ", user);
      // console.log("jwt token", token);

      if (user) {
        if (user.isNewUser) {
          // console.log("55555");
          token.github = user; // Зберігаємо дані GitHub в токені
          token.isNewUser = true; // Якщо новий користувач через GitHub
        } else {
          // console.log("777777");
          token.id = user.id;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
          token.role = user.role;
          token.email = user.email;
          token.phone = user.phone;
          token.license = user.license;
        }
      } else if (!token.isNewUser) {
        token.isNewUser = false; // Якщо користувач увійшов через email та password
        // console.log("88888");
      }

      return token;
    },
  },
};
