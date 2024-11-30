import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { NextAuthOptions } from 'next-auth'
import { User } from './database/model/User'
import { userConnectionString } from './database/db_connection_user'
import mongoose from 'mongoose'

declare module 'next-auth' {
    interface Session {
        user: {
            id?: string; // Optional field for user ID
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
    callbacks: {
        async signIn({ user }) {
            await mongoose.connect(userConnectionString);

            // Check if user exists in MongoDB
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                // Create a new user
                await User.create({
                    name: user.name as string,
                    email: user.email as string,
                    image: user.image as string,
                });
            }

            return true; // Allow sign-in
        },
        async session({ session }) {
            await mongoose.connect(userConnectionString);

            // Check if session.user exists
            if (session.user?.email) {
                const dbUser = await User.findOne({ email: session.user.email });
                session.user.id = dbUser?._id.toString(); // Convert ObjectId to string if needed
            }

            return session; // Return the modified session
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
}