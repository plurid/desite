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
} from '../../interfaces/external';

import {
    Indexed,
    QueueAction,
    InputDesitVisit,
    InputDesitInteract,
} from '../../interfaces/internal';

import {
    PLURID_API_ENDPOINT,
} from '../../constants';

import {
    DESIT_ACTIONS,
} from '../../enumerations';

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
    private instanceID = uuid() + uuid();

    constructor(options: DesitOptions) {
        this.options = options;
        this.client = graphqlClient(this.options.apiEndpoint || PLURID_API_ENDPOINT);
        this.queue = new Proxy({}, this.queueChange());

        if (this.options.visitOnURLChange && window) {
            window.addEventListener('popstate', (event) => {
                const visitOptions: DesitVisitOptions = {
                    userID: this.options.userID,
                };
                this.visit(location.pathname, visitOptions);
            });
        }
    }

    visit(
        path: string,
        options?: DesitVisitOptions,
    ) {
        const inputVisitMutation: InputDesitVisit = {
            timestamp: Date.now(),
            appID: this.options.appID,
            path,
            options: {
                ...options,
                userID: (options && options.userID)
                    || this.options.userID
                    || this.instanceID,
                meta: options && options.meta
                    ? JSON.stringify(options.meta)
                    : '',
            },
        };

        const id = uuid();
        const queueAction: QueueAction = {
            id,
            type: DESIT_ACTIONS.VISIT,
            input: inputVisitMutation,
        };
        this.queue[id] = queueAction;
    }

    interact(
        type: string,
        element: ReactElement | string,
        options?: DesitInteractOptions,
    ) {
        const elementName = getElementName(element);

        const inputInteractMutation: InputDesitInteract = {
            timestamp: Date.now(),
            appID: this.options.appID,
            type,
            element: elementName,
            options: {
                ...options,
                userID: (options && options.userID)
                    || this.options.userID
                    || this.instanceID,
                meta: options && options.meta
                    ? JSON.stringify(options.meta)
                    : '',
            },
        };

        const id = uuid();
        const queueAction: QueueAction = {
            id,
            type: DESIT_ACTIONS.INTERACT,
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

    private removeFromQueue(
        id: string,
    ) {
        delete this.queue[id];
    }

    private async handleDispatch(
        action: QueueAction,
    ) {
        switch (action.type) {
            case DESIT_ACTIONS.VISIT:
                return await this.dispatchVisit(
                    action.id,
                    action.input,
                );
            case DESIT_ACTIONS.INTERACT:
                return await this.dispatchInteract(
                    action.id,
                    action.input,
                );
            default:
                return;
        }
    }

    private async dispatchVisit(
        actionID: string,
        input: InputDesitVisit,
    ) {
        try {
            this.removeFromQueue(actionID);
            return await this.client.mutate({
                mutation: DESIT_VISIT,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }

    private async batchDispatchVisit(
    ) {
        // TODO
        // dispatch multiple visits based on queue throttling
    }

    private async dispatchInteract(
        actionID: string,
        input: InputDesitInteract,
    ) {
        try {
            this.removeFromQueue(actionID);
            return await this.client.mutate({
                mutation: DESIT_INTERACT,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }

    private async batchDispatchInteract(
    ) {
        // TODO
        // dispatch multiple interacts based on queue throttling
    }
}


export default Desit;