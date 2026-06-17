import { argon2id } from 'hash-wasm';
import { MessageToClient, MessageToClientType, MessageToServer, MessageToServerType } from "../apiTypes"
import { createPanel } from './panels';

let panel = document.createElement("div");
panel.className = "panel";
document.body.appendChild(panel);

let errorList = document.querySelector("div.error-list")

enum HTMLErrorType {
    SUCCESS = "success",
    FAIL = "fail",
    WARN = "warn"
}

function showError(type: HTMLErrorType, message: string) {
    if(!errorList) {
        errorList = document.createElement("div");
        errorList.className = "error-list";
        document.body.appendChild(errorList);
    }

    const error = document.createElement("div");

    error.innerHTML = message;
    error.className = "error-message "+type;
    errorList.appendChild(error);
}

async function PostAPI(msg: MessageToServer): Promise<MessageToClient> {
    const res = (await fetch("./api", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(msg)
    }))

    if(res.ok) {
        return await res.json();
    } else {
        throw new Error("Server Error!")
    }
}

export async function createAccount(username: string, password: string) {
    const passwordHash = await argon2id({
        password,
        salt: window.crypto.getRandomValues(new Uint8Array(16)),
        parallelism: 1,
        iterations: 3,
        memorySize: 65536,
        hashLength: 32,
        outputType: 'hex'
    });

    const response = await PostAPI({
        type: MessageToServerType.NONE
    });

    switch(response.type) {
        case MessageToClientType.FAIL: {
            throw response.data;
        }

        case MessageToClientType.SUCCESS: {
            return response.data;
        }

        default: {
            throw new Error("Unknown Response")
        }
    }
}

const loginButton = document.querySelector(".login")
const signupButton = document.querySelector(".signup")

loginButton?.addEventListener("click", (event)=>{
    const usernameInput = document.createElement("input");
    usernameInput.placeholder = "username";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "password";

    const loginPanel = createPanel([usernameInput, passwordInput]);
    
    panel.innerHTML = loginPanel.innerHTML
})