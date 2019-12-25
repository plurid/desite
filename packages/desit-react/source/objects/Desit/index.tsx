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

    // visit and interact adds to queue
    // and the queue dispatches every 3-10 seconds
    private queue: any[] = [];

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

        const queueElement = {
            timestamp: Date.now(),
            type: 'VISIT',
            input: inputVisitMutation,
        };
        this.queue.push(queueElement);
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

        const queueElement = {
            timestamp: Date.now(),
            type: 'INTERACT',
            input: inputInteractMutation,
        };
        this.queue.push(queueElement);
    }

    private async handleDispatch(
        action: any,
    ) {
        switch (action.type) {
            case 'VISIT':
                return await this.dispatchVisit(action.input);
            case 'INTERACT':
                return await this.dispatchInteract(action.input);
            default:
                return;
        }
    }

    private async dispatchVisit(
        input: any,
    ) {
        return await this.client.mutate({
            mutation: DESIT_VISIT,
            variables: {
                input,
            },
        });
    }

    private async dispatchInteract(
        input: any,
    ) {
        return await this.client.mutate({
            mutation: DESIT_INTERACT,
            variables: {
                input,
            },
        });
    }
}


export default Desit;
