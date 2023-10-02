import type {  NextAuthOptions } from "next-auth";
 
import GoogleProvider from 'next-auth/providers/google'
import {PrismaClient} from '@prisma/client'
import { PrismaAdapter } from "@auth/prisma-adapter";
 
const prisma=new PrismaClient();
export const authOptions:NextAuthOptions={
    adapter:PrismaAdapter(prisma),
 
    providers:[
        GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        async signIn({user,account,profile,email,credentials}){
            return true;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            const sessionUser = { ...session.user, ...user };
          
            return Promise.resolve({
                ...session,
                user: sessionUser,
              });
          }
    }
}