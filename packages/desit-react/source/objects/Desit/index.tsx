import {
    ApolloClient,
} from 'apollo-client';
import {
    NormalizedCacheObject,
} from 'apollo-cache-inmemory';

import {
    IDesit,
    DesitOptions,
    DesitVisitOptions,
    DesitInteractOptions,

    ReactElement,
} from '../../interfaces';

import {
    PLURID_API_ENDPOINT,
} from '../../constants';

import graphqlClient from '../../services/graphql/client';
import {
    DESIT_VISIT,
    DESIT_INTERACT,
} from '../../services/graphql/mutate';



class Desit implements IDesit {
    private options: DesitOptions;
    private client: ApolloClient<NormalizedCacheObject>;

    constructor(options: DesitOptions) {
        this.options = options;
        this.client = graphqlClient(this.options.apiEndpoint || PLURID_API_ENDPOINT);
    }

    visit(
        path: string,
        options?: DesitVisitOptions,
    ) {
        const inputVisitMutation = {
            appID: this.options.appID,
            path,
            options,
        };

        this.client.mutate({
            mutation: DESIT_VISIT,
            variables: {
                input: inputVisitMutation,
            },
        });
    }

    interact(
        type: string,
        element: ReactElement,
        options?: DesitInteractOptions,
    ) {
        const inputInteractMutation = {
            appID: this.options.appID,
            type,
            element,
            options,
        };

        this.client.mutate({
            mutation: DESIT_INTERACT,
            variables: {
                input: inputInteractMutation,
            },
        });
    }
}


export default Desit;
