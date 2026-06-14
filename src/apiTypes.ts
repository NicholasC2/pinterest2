export enum MessageToServerType {
    NONE,
}

export enum MessageToClientType {
    SUCCESS,
    FAIL,
}

export enum ErrorToClientType {
    UNKNOWN,
    
    INTERNAL_ERROR,
}

export type MessageToClient = {
    type: MessageToClientType,
    data: any,
}

export type MessageToServer = {
    type: MessageToServerType,
    data: any,
}