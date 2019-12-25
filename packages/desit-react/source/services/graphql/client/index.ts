import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';



const client = (uri: string) => new ApolloClient({
    link: createHttpLink({
        uri,
        credentials: 'include',
    }),
    cache: new InMemoryCache(),
});


export default client;
