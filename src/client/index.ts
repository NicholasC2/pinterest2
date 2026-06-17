import argon2 from "argon2-browser";
import { MessageToServer } from "../apiTypes"

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

async function PostAPI(msg: MessageToServer) {
    return (await fetch("./api", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(msg)
    })).
}

export async function createAccount(username: string, password: string) {
    const passwordHash = await argon2.hash({
        pass: password,
        type: argon2.ArgonType.Argon2id,
        mem: 65536,
        time: 3,
        parallelism: 1,
        hashLen: 32,
        salt: window.crypto.getRandomValues(new Uint8Array(length))
    });


}