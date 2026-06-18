import { Profile } from "./database/database";

export enum MessageToServerType {
    NONE,

    ACCOUNT_LOGIN,
    ACCOUNT_CREATE,

    ACCOUNT_CHECK_USERNAME,
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
} | {
    type: MessageToServerType.ACCOUNT_CHECK_USERNAME,
    data: {
        username: string;
    }
} | {
    type: MessageToServerType.ACCOUNT_CREATE,
    data: {
        username: string;
        password: string;
        profile: Profile;
    }
} | {
    type: MessageToServerType.ACCOUNT_LOGIN,
    data: {
        username: string;
        password: string;
    }
}