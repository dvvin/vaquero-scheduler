import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        fullName: string;
        studentID: string;
        email: string;
        classification: string; 
    }

    interface Session {
        user: User & {
            fullName: string;
            studentID: string;
            email: string;
            classification: string;
        },
        token: {
            fullName: string;
            studentID: string;
            email: string;
            classification: string;
        }
    }
}
