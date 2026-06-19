import { Profile } from "./database/database";

export enum MessageToServerType {
    NONE,

    ACCOUNT_LOGIN,
    ACCOUNT_CREATE,

    ACCOUNT_CHANGE,
    ACCOUNT_GET_CURRENT,
    ACCOUNT_CHECK_USERNAME,
    ACCOUNT_LOGOUT,

    GET_RANDOM_IMAGE,
    GET_IMAGE,
    SEARCH_IMAGES,

    GET_TAGS,
}

export enum MessageToClientType {
    SUCCESS,
    FAIL,
}

export enum ErrorToClientType {
    UNKNOWN,
    
    INTERNAL_ERROR,

    ACCOUNT_EXISTS,
    ACCOUNT_DOESNT_EXIST,
    ACCOUNT_PASSWORD_INVALID,
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
        passwordHash: string;
        profile: Profile;
    }
} | {
    type: MessageToServerType.ACCOUNT_LOGIN,
    data: {
        username: string;
        password: string;
    }
} | {
    type: MessageToServerType.ACCOUNT_LOGOUT | MessageToServerType.ACCOUNT_GET_CURRENT | MessageToServerType.GET_TAGS | MessageToServerType.GET_RANDOM_IMAGE | MessageToServerType.GET_TAGS
} | {
    type: MessageToServerType.ACCOUNT_CHANGE,
    data: {
        username?: string;
        profile: Profile;
    }
} | {
    type: MessageToServerType.GET_IMAGE,
    data: {
        imageID: string;
    }
} | {
    type: MessageToServerType.SEARCH_IMAGES,
    data: {
        includeTags?: [],
        excludeTags?: [],
        search: string,
    }
}