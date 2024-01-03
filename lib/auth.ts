import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { error } from "console";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/SignIn",
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "username", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const user = await prisma.login.findUnique({
                    where: { username: credentials.username }
                });

                if (!user) return null;

                const passwordMatch = credentials.password && user.password && await compare(credentials.password, user.password);

                if (!passwordMatch || !user) {
                    throw new Error("Invalid username or password");
                }


                return {
                    id: `${user.id}`,
                    username: user.username,
                    password: user.password
                }
            }
        })
    ]
};
