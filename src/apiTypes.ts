export enum MessageToServerType {
    NONE,

    UPLOAD_IMAGE,
}

export enum MessageToClientType {
    SUCCESS,
    FAIL,
}

export enum ErrorToClientType {
    UNKNOWN,
    
    INTERNAL_ERROR,

    UPLOAD_FILENAME_NOT_ALLOWED
}

export type MessageToClient = | {
    type: MessageToClientType.FAIL,
    data: ErrorToClientType;
} | {
    type: MessageToClientType.SUCCESS,
    data?: Object
}

export type MessageToServer = | {
    type: MessageToServerType.UPLOAD_IMAGE,
    data: {
        base64: string;
        fileName: string;
    }
}