// #region imports
    // #region libraries
    import React from 'react';
    // #endregion libraries
// #endregion imports



// #region module
export interface IDesite {
    /**
     * Trigger when the user visits a page,
     * be it a server-delivered page, or a client-controlled page.
     *
     * @param element - React functional or class component, or a pure JSX element.
     * @param options - Pass in the `userID` and more.
     * */
    visit(
        path: string,
        options?: DesiteVisitOptions,
    ): void;

    /**
     * Trigger when the user interacts with a page element,
     * e.g. `div`, `button`, `img`, and so forth.
     *
     * @param type - If the type has not been registered before,
     *               it will create a new one in the dashboard.
     *               For starters consider using the standard `INTERACT_TYPES`.
     * @param element - React functional or class component, or a pure JSX element,
     *                  or an identification string.
     * @param options - Pass in the `userID` and more.
     */
    interact(
        type: string,
        element: ReactElement | string,
        options?: DesiteInteractOptions,
    ): void;
}


export interface DesiteOptions {
    /**
     * Application ID obtained from https://account.plurid.com/Desite,
     * or generated if self-hosting.
     */
    appID: string;

    /**
     * Change the API endpoint if self-hosting. Default https://api.plurid.com.
     */
    apiEndpoint?: string;

    /**
     * Initialize the session for a specific user ID.
     */
    userID?: string;

    /**
     * Listen for URL changes (within the same web page)
     * and automatically trigger a `visit()`.
     */
    visitOnURLChange?: boolean;
}


export interface DesiteVisitOptions {
    userID?: string;
    meta?: unknown;
}


export interface DesiteInteractOptions {
    userID?: string;
    path?: string;
    meta?: unknown;
}


export type ReactElement =
    | JSX.Element
    | React.FC
    | typeof React.Component;
// #endregion module
