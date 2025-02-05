import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prisma-client";

const findOrCreateUser = async (email: string, profile: any) => {
  let user = await prisma.user.findUnique({ where: { email } });

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
      },
    });
    profile.isNewUser = true;
  } else {
    profile.isNewUser = false;
  }

  return { ...profile, ...user };
};

export const authConfig: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      async profile(profile) {
        return await findOrCreateUser(profile.email, profile);
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

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        const { password, ...userWithoutPass } = user;

        return {
          ...userWithoutPass,
          id: userWithoutPass.id.toString(),
          isNewUser: false,
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
        isNewUser: token.isNewUser as boolean,
        id: token.id as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        role: token.role as string,
        phone: token.phone as string,
        license: token.license as string,
        email: token.email as string,
      };

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
          isNewUser: user.isNewUser ?? false,
        };
      }

      return token;
    },
  },
};
