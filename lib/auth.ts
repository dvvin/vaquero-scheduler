import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

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
                fullName: { label: "Full Name", type: "text", placeholder: "Your Full Name" },
                classification: { label: "Classification", type: "text", placeholder: "Your Classification" },
                email: { label: "Email", type: "email", placeholder: "Your Email" },
                studentID: { label: "Student ID", type: "text", placeholder: "Your Student ID" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                if (!credentials?.email || !credentials?.password)
                    return null;

                const user = await prisma.studentInfo.findUnique({
                    where: {
                        email: credentials.email
                    }
                });


                if (!user) return null;

                const passwordMatch = credentials.password && user.password && await compare(credentials.password, user.password);

                if (!passwordMatch) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: `User ID: ${user.id}`,
                    fullName: user.fullName!,
                    classification: user.classification!,
                    studentID: user.studentID!,
                    email: user.email!,
                    password: user.password!
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    fullName: user.fullName,
                    studentID: user.studentID,
                    email: user.email,
                    classification: user.classification
                };
            }
            return token;
        },

        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    fullName: token.fullName,
                    studentID: token.studentID,
                    email: token.email,
                    classification: token.classification
                }
            };
        }
    }
};
