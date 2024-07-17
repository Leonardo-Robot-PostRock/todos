import NextAuth from "next-auth";
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const authOptions = {
    providers: [Github, Google],
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);