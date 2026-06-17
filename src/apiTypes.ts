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

export type MessageToClient = | {
    type: MessageToClientType.FAIL,
    data: ErrorToClientType;
} | {
    type: MessageToClientType.SUCCESS,
    data?: Object
}

export type MessageToServer = | {
    type: MessageToServerType.NONE,
    data?: any
}