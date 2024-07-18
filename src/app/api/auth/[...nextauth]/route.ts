import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID ?? '',
            clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
        }),

        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID ?? '',
            clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
        }),

    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const emailProfile = profile?.email;
            if (!emailProfile) {
                return false;
            }

            let existingUser = await prisma.user.findUnique({
                where: { email: emailProfile },
                include: { accounts: true }
            })

            if (existingUser) {
                const accountExists = existingUser.accounts.some(
                    acc => acc.provider === account?.provider && acc.providerAccountId === account.providerAccountId
                );

                if (account && !accountExists) {
                    await prisma.account.create({
                        data: {
                            userId: existingUser.id,
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            refresh_token: account.refresh_token,
                            refresh_token_expires_in: account.refresh_token_expires_in as number | null,
                            access_token: account.access_token,
                            expires_at: account.expires_at,
                            token_type: account.token_type,
                            scope: account.scope,
                            id_token: account.id_token,
                            session_state: account.session_state
                        }
                    });
                }

                user.id = existingUser.id;
                return true;
            }

            return true;
        },

        async jwt({ token, user, account, profile }) {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

            if (dbUser?.isActive === false) {
                throw new Error('Usuario no activo');
            }

            token.roles = dbUser?.roles ?? ['no-roles'];
            token.id = dbUser?.id ?? 'no-uuid';

            return token;
        },

        async session({ session, token, user }) {
            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }

            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 