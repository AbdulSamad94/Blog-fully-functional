import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { NextAuthOptions } from 'next-auth'
import { User } from './database/model/User'
import connectToDatabase from './database/db_connection'

declare module 'next-auth' {
    interface Session {
        user: {
            id?: string;
            name?: string;
            email?: string;
            image?: string;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user }) {
            await connectToDatabase();

            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                await User.create({
                    name: user.name as string,
                    email: user.email as string,
                    image: user.image as string,
                });
            }

            return true;
        },
        async session({ session }) {
            await connectToDatabase();

            if (session.user?.email) {
                const dbUser = await User.findOne({ email: session.user.email });
                session.user.id = dbUser?._id.toString(); // Convert ObjectId to string if needed
            }

            return session;
        }
    },


    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
}