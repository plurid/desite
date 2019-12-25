export interface IDesit {
    visit(path: string): void;
    interact(
        type: string,
        element: React.FC,
        options?: DesitInteractOptions,
    ): void;
}


export interface DesitOptions {
    appID: string;
}


export interface DesitInteractOptions {
    path: string;
    meta: any;
}
