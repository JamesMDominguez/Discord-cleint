import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:2000/'
});

const wsLink =
    typeof window !== 'undefined'
        ? new GraphQLWsLink(
                createClient({
                    url:'ws://localhost:2000/graphql',
                })
          )
        : null;

const splitLink =
    typeof window !== "undefined" && wsLink != null
        ? split(
                ({ query }) => {
                    const def = getMainDefinition(query);
                    return (
                        def.kind === "OperationDefinition" &&
                        def.operation === "subscription"
                    );
                },
                wsLink,
                httpLink
          )
        : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
