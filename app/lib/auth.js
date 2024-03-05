import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const existingUser = await db.user.findUnique({
          where: {
            username: credentials?.username,
            // status: "Aktif"
          },
        });
        if (!existingUser) return null;
        // const passwordMatch = await compare(credentials.password, existingUser.password);
        // if (!passwordMatch) return null;
        return {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
          foto: existingUser.foto,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const existingUser = await db.user.findUnique({
        where: {
          id: Number(token.sub),
          status: "Aktif"
        },
      });
      return {
        ...session,
        user: {
          id: existingUser.id,
          username: existingUser.username,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.foto,
          status: existingUser.status,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          // id: user.id,
          // name: user.name, 
          // email: user.email,
          username: user.username,
          // status: user.status,
        };
      }
      return token;
    },
  },
};
