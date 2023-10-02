import {  PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { Context } from "graphql-ws/lib/server";
// import {Session} from 'next-auth'

export interface Session {
  user?: User;
}
export interface GraphQLContext{
    session:Session | null,
    prisma:PrismaClient;
    pubsub:PubSub
}

export interface SubscriptionContext extends Context {
    connectionParams: {
      session?: Session;
    };
  }
 
  // export interface User {
  //   id: string;
  //   username: string;
  //   emailVerified:boolean;
  //   image:string;
  //   name:string;
  //   email:string
  // }
// User interfaces
export interface CreateUsernameResponse{
    success?:boolean;
    error?:string
}
 
export interface SearchUsersResponse{
    users:Array<User>;
}
export interface User {
    id: string;
    username: string;
  }
