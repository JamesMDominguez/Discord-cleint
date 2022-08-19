import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import ServerList from '../components/ServersList'

const httpLink = new HttpLink({
  uri: 'https://discord-server-clone-oak.herokuapp.com/'
});

const wsLink =
    typeof window !== 'undefined'
        ? new GraphQLWsLink(
                createClient({
                    url:'wss://discord-server-clone-oak.herokuapp.com/graphql',
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
      <ServerList/>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
