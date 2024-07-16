import NextAuth, { NextAuthConfig } from "next-auth";
import Github from 'next-auth/providers/github';

export const authOptions = {
    providers: [Github],
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);