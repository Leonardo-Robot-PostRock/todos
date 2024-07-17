import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const authOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [Github, Google],
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);