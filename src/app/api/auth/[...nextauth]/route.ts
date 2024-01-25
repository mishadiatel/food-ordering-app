import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import mongoose from 'mongoose';
import {User} from '@/app/models/User';
import bcrypt from 'bcrypt';
import {MongoDBAdapter} from '@auth/mongodb-adapter';
import clientPromise from '@/libs/mongoConnect';
import {Adapter} from 'next-auth/adapters';

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'test@example.com'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req) {
                //@ts-ignore
                const {email, password} = credentials;
                mongoose.connect(process.env.MONGO_URL!);
                const user = await User.findOne({email});
                const passwordOk = user && bcrypt.compareSync(password, user.password);
                if (passwordOk) {
                    return user;
                }
                return null
            }
        })

    ]
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
