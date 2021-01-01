// #region imports
    // #region libraries
    import fetch from 'cross-fetch';

    import {
        ApolloClient,
        createHttpLink,
        InMemoryCache,
    } from '@apollo/client';
    // #endregion libraries
// #endregion imports



// #region module
const client = (
    uri: string,
) => new ApolloClient({
    link: createHttpLink({
        uri,
        credentials: 'include',
        fetch,
    }),
    cache: new InMemoryCache(),
});
// #endregion module



// #region exports
export default client;
// #endregion exports
