import NextAuth, { NextAuthConfig } from "next-auth";
import Github from 'next-auth/providers/github';

export const authOptions: NextAuthConfig = {
    providers: [
        Github({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
    ],
}

export const { handlers } = NextAuth(authOptions);