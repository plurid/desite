// #region imports
    // #region external
    import {
        DESITE_ACTIONS,
    } from '../enumerations';
    // #endregion external


    // #region internal
    import {
        DesiteVisitOptions,
        DesiteInteractOptions,
    } from './external';
    // #endregion internal
// #endregion imports



// #region module
export interface QueueActionPure {
    id: string;
}

export interface QueueActionVisit extends QueueActionPure {
    type: typeof DESITE_ACTIONS.VISIT;
    input: InputDesiteVisit;
}

export interface QueueActionInteract extends QueueActionPure {
    type: typeof DESITE_ACTIONS.INTERACT;
    input: InputDesiteInteract;
}

export type QueueAction = QueueActionVisit
    | QueueActionInteract;


export interface Indexed<T> {
    [key: string]: T;
}


export interface InputDesiteVisit {
    timestamp: number;
    appID: string;
    path: string;
    options: DesiteVisitOptions;
}


export interface InputDesiteInteract {
    timestamp: number;
    appID: string;
    type: string;
    element: string;
    options: DesiteInteractOptions;
}
// #endregion module
