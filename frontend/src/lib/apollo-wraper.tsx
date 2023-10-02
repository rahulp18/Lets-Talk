"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import { getSession } from "next-auth/react";
import { setContext } from "@apollo/client/link/context";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
 
const authLink = setContext(async(_, { headers }) => {
  // get the authentication token from local storage if it exists
  const session=await getSession();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: session ? session : "",
    }
  }
});
function makeClient() {
  const httpLink = new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(httpLink),
          ])
        :   authLink.concat(httpLink),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}