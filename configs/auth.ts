import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prisma-client";
import { RoleEnum } from "@/enum/shared.enums";
import { v4 as uuidv4 } from "uuid"; // Для генерації унікального ключа
import { url } from "inspector";

const findOrCreateUser = async (email: string, profile: any) => {
  let user = await prisma.user.findUnique({ where: { email } });
  // console.log("USER GITHUB");
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        firstName: profile.name || "",
        lastName: "",
        role: "user",
        phone: "",
        license: "no license",
        password: "", // Пароль не потрібен для GitHub авторизації
        apiKey: uuidv4(),
      },
    });
    profile.isNewUser = true;
  } else {
    profile.isNewUser = false;
  }

  return { ...profile, ...user };
};

const processObj: { clientId: string; clientSecret: string } = {
  clientId: process.env.GITHUB_CLIENT_ID_LOCALHOST!,
  clientSecret: process.env.GITHUB_SECRET_LOCALHOST!,
};

if (process.env.NEXTAUTH_URL === "https://cursovaautobus-production.up.railway.app") {
  processObj.clientId = process.env.GITHUB_CLIENT_ID_RAILWAY!;
  processObj.clientSecret = process.env.GITHUB_SECRET_RAILWAY!;
}

export const authConfig: AuthOptions = {
  providers: [
    GitHubProvider({
      ...processObj,
      profile(profile) {
        return findOrCreateUser(profile.email, profile); // Без `await`
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return findOrCreateUser(profile.email, profile); // Без `await`
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

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        return {
          ...user,
          id: user.id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role as RoleEnum,
          phone: user.phone,
          license: user.license,
          isNewUser: false,
          apiKey: user.apiKey,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/complete-profile",
  },

  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...session.user,
        isNewUser: token.isNewUser,
        id: token.id,
        email: token.email,
        avatar_url: token.avatar_url,
        firstName: token.firstName,
        lastName: token.lastName,
        role: token.role,
        phone: token.phone,
        license: token.license,
        apiKey: token.apiKey,
      };

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        // console.log("user", user);
        token = {
          ...token,
          id: user.id,
          email: user.email ?? "",
          name: user.name ?? "",
          image: user.image ?? "",
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          phone: user.phone ?? "",
          license: user.license ?? "",
          picture: user.picture ?? "",
          role: user.role as RoleEnum,
          avatar_url: user.avatar_url ?? "", // Запобігаємо undefined
          isNewUser: user.isNewUser ?? false,
          apiKey: user.apiKey ?? "",
        };
      }

      return token;
    },
  },
};
