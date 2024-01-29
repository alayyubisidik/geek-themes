import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import Login from "@/service/login";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };

                const user: any = await Login(username, password);
                if (user.status === 200) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === "credentials") {
                token.id = user.data.id;
                token.name = user.data.name;
                token.username = user.data.username;
                token.email = user.data.email;
                token.role = user.data.role;
                token.token = user.data.token;
            }
            return token;
        },

        async session({ session, token }: any) {
            if (token && token.username) {
                session.user.username = token.username;
            }
            if (token && token.id) {
                session.user.id = token.id;
            }
            if (token && token.name) {
                session.user.name = token.name;
            }
            if (token && token.email) {
                session.user.email = token.email;
            }
            if (token && token.role) {
                session.user.role = token.role;
            }
            if (token && token.token) {
                session.user.token = token.token;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
