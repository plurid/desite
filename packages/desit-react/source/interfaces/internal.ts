import {
    DesitVisitOptions,
    DesitInteractOptions,
} from './external';

import {
    DESIT_ACTIONS,
} from '../enumerations';



export interface QueueActionPure {
    id: string;
}

export interface QueueActionVisit extends QueueActionPure {
    type: typeof DESIT_ACTIONS.VISIT;
    input: InputDesitVisit;
}

export interface QueueActionInteract extends QueueActionPure {
    type: typeof DESIT_ACTIONS.INTERACT;
    input: InputDesitInteract;
}

export type QueueAction = QueueActionVisit
    | QueueActionInteract;


export interface Indexed<T> {
    [key: string]: T;
}


export interface InputDesitVisit {
    timestamp: number;
    appID: string;
    path: string;
    options: DesitVisitOptions;
}


export interface InputDesitInteract {
    timestamp: number;
    appID: string;
    type: string;
    element: string;
    options: DesitInteractOptions;
}
