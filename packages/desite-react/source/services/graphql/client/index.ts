import fetch from 'cross-fetch';

import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';



const client = (uri: string) => new ApolloClient({
    link: createHttpLink({
        uri,
        credentials: 'include',
        fetch,
    }),
    cache: new InMemoryCache(),
});


export default client;
