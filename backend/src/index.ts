 
import {ApolloServer} from '@apollo/server'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import dotEnv from 'dotenv'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser';
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { PrismaClient } from '@prisma/client';
import { GraphQLContext, SubscriptionContext } from './utils/types';
import {getSession} from 'next-auth/react'
import { Session } from 'next-auth';
import { getServerSession } from './utils/getServerSession';

 const {json}=bodyParser;
// const typeDefs = `#graphql
// # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

// # This "Book" type defines the queryable fields for every book in our data source.
// type Book {
//   title: String
//   author: String
// }

// # The "Query" type is special: it lists all of the available queries that
// # clients can execute, along with the return type for each. In this
// # case, the "books" query returns an array of zero or more Books (defined above).
// type Query {
//   books: [Book]
// }
// `;
// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ]; 
// // Resolvers define how to fetch the types defined in your schema.
// // This resolver retrieves books from the "books" array above.
// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };
 
  dotEnv.config();
 
  const schema=makeExecutableSchema({
    typeDefs,
    resolvers
  })
  const app=express();
const httpServer=http.createServer(app);

const prisma=new PrismaClient();
const pubsub=new PubSub();

// const getSubscriptionContext=async(ctx:SubscriptionContext):Promise<GraphQLContext>=>{
//       ctx;
//       if(ctx.connectionParams && ctx.connectionParams.session){
//         const {session}=ctx.connectionParams;
//         return {session,prisma,pubsub}
//       }
//       return {session:null,prisma,pubsub}
// }

const server=new ApolloServer({
  schema,
  plugins:[ApolloServerPluginDrainHttpServer({httpServer})]
});

 await server.start();
 const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
 app.use('/graphql',
 cors<cors.CorsRequest>(corsOptions),
 json(),
 expressMiddleware(server,{
  context:async({req}):Promise<GraphQLContext>=>{
    const session = await getServerSession(req.headers.cookie);
    console.log(req.headers.cookie,"Session")
    return {session:session as Session,prisma,pubsub}
  }
 }),

 )
 await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
 console.log(`🚀 Server ready at http://localhost:4000/graphql`);
 