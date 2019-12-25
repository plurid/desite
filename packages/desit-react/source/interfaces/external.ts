import React from 'react';



export interface IDesit {
    /**
     * Trigger when the user visits a page,
     * be it a server-delivered page, or a client-controlled page.
     *
     * @param element - React functional or class component, or a pure JSX element.
     * @param options - Pass in the `userID` and more.
     * */
    visit(
        path: string,
        options?: DesitVisitOptions,
    ): void;

    /**
     * Trigger when the user interacts with a page element,
     * e.g. `div`, `button`, `img`, and so forth.
     *
     * @param type - If the type has not been registered before,
     *               it will create a new one in the dashboard.
     *               For starters consider using the standard `INTERACT_TYPES`.
     * @param element - React functional or class component, or a pure JSX element.
     * @param options - Pass in the `userID` and more.
     */
    interact(
        type: string,
        element: ReactElement,
        options?: DesitInteractOptions,
    ): void;
}


export interface DesitOptions {
    /**
     * Application ID obtained from https://account.plurid.com/desit,
     * or generated if self-hosting.
     */
    appID: string;

    /**
     * Change the API endpoint if self-hosting. Default https://api.plurid.com.
     */
    apiEndpoint?: string;

    userID?: string;
}


export interface DesitVisitOptions {
    userID?: string;
    meta?: unknown;
}


export interface DesitInteractOptions {
    userID?: string;
    path?: string;
    meta?: unknown;
}


export type ReactElement = JSX.Element | React.FC | typeof React.Component;
