import {
    ApolloClient,
} from 'apollo-client';
import {
    NormalizedCacheObject,
} from 'apollo-cache-inmemory';

import {
    uuidv4 as uuid,
} from '@plurid/plurid-functions';

import {
    IDesit,
    DesitOptions,
    DesitVisitOptions,
    DesitInteractOptions,

    ReactElement,
} from '../../interfaces';

import {
    Indexed,
    QueueAction,
} from '../../interfaces/internal';

import {
    PLURID_API_ENDPOINT,
} from '../../constants';

import graphqlClient from '../../services/graphql/client';
import {
    DESIT_VISIT,
    DESIT_INTERACT,
} from '../../services/graphql/mutate';

import {
    getElementName,
} from '../../services/utilities/react';





class Desit implements IDesit {
    private options: DesitOptions;
    private client: ApolloClient<NormalizedCacheObject>;
    private queue: Indexed<QueueAction>;

    constructor(options: DesitOptions) {
        this.options = options;
        this.client = graphqlClient(this.options.apiEndpoint || PLURID_API_ENDPOINT);
        this.queue = new Proxy({}, this.queueChange());
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

        const id = uuid();
        const queueAction: QueueAction = {
            id,
            timestamp: Date.now(),
            type: 'VISIT',
            input: inputVisitMutation,
        };
        this.queue[id] = queueAction;
    }

    interact(
        type: string,
        element: ReactElement,
        options?: DesitInteractOptions,
    ) {
        const elementName = getElementName(element);

        const inputInteractMutation = {
            appID: this.options.appID,
            type,
            element: elementName,
            options,
        };

        const id = uuid();
        const queueAction: QueueAction = {
            id,
            timestamp: Date.now(),
            type: 'INTERACT',
            input: inputInteractMutation,
        };
        this.queue[id] = queueAction;
    }

    private queueChange() {
        return {
            set: (
                target: Indexed<QueueAction>,
                property: string,
                value: QueueAction,
            ) => {
                target[property] = value;
                this.handleDispatch(value);
                return true;
            }
        };
    }

    private async handleDispatch(
        action: QueueAction,
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
        console.log(input);
        console.log(this.queue);
        // return await this.client.mutate({
        //     mutation: DESIT_VISIT,
        //     variables: {
        //         input,
        //     },
        // });
    }

    private async dispatchInteract(
        input: any,
    ) {
        console.log(input);
        console.log(this.queue);
        // return await this.client.mutate({
        //     mutation: DESIT_INTERACT,
        //     variables: {
        //         input,
        //     },
        // });
    }
}


export default Desit;
