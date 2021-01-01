import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    IDesite,
    DesiteOptions,
    DesiteVisitOptions,
    DesiteInteractOptions,

    ReactElement,
} from '../../data/interfaces/external';

import {
    Indexed,
    QueueAction,
    InputDesiteVisit,
    InputDesiteInteract,
} from '../../data/interfaces/internal';

import {
    PLURID_API_ENDPOINT,
} from '../../data/constants';

import {
    DESITE_ACTIONS,
} from '../../data/enumerations';

import graphqlClient from '../../services/graphql/client';
import {
    DESITE_VISIT,
    DESITE_INTERACT,
} from '../../services/graphql/mutate';

import {
    getElementName,
} from '../../services/utilities/react';



class Desite implements IDesite {
    private options: DesiteOptions;
    private client: ApolloClient<NormalizedCacheObject>;
    private queue: Indexed<QueueAction>;
    private instanceID = uuid.generate() + uuid.generate();

    constructor(options: DesiteOptions) {
        this.options = options;
        this.client = graphqlClient(this.options.apiEndpoint || PLURID_API_ENDPOINT);
        this.queue = new Proxy({}, this.queueChange());

        if (this.options.visitOnURLChange && window) {
            window.addEventListener('popstate', (event) => {
                const visitOptions: DesiteVisitOptions = {
                    userID: this.options.userID,
                };
                this.visit(location.pathname, visitOptions);
            });
        }
    }

    visit(
        path: string,
        options?: DesiteVisitOptions,
    ) {
        const inputVisitMutation: InputDesiteVisit = {
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

        const id = uuid.generate();
        const queueAction: QueueAction = {
            id,
            type: DESITE_ACTIONS.VISIT,
            input: inputVisitMutation,
        };
        this.queue[id] = queueAction;
    }

    interact(
        type: string,
        element: ReactElement | string,
        options?: DesiteInteractOptions,
    ) {
        const elementName = getElementName(element);

        const inputInteractMutation: InputDesiteInteract = {
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

        const id = uuid.generate();
        const queueAction: QueueAction = {
            id,
            type: DESITE_ACTIONS.INTERACT,
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
            case DESITE_ACTIONS.VISIT:
                return await this.dispatchVisit(
                    action.id,
                    action.input,
                );
            case DESITE_ACTIONS.INTERACT:
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
        input: InputDesiteVisit,
    ) {
        try {
            this.removeFromQueue(actionID);
            return await this.client.mutate({
                mutation: DESITE_VISIT,
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
        input: InputDesiteInteract,
    ) {
        try {
            this.removeFromQueue(actionID);
            return await this.client.mutate({
                mutation: DESITE_INTERACT,
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


export default Desite;
