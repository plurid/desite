export interface QueueAction {
    id: string;
    timestamp: number;
    type: string;
    input: any;
}


export interface Indexed<T> {
    [key: string]: T;
}
