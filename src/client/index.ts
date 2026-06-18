import { argon2id } from 'hash-wasm';
import { ErrorToClientType, MessageToClient, MessageToClientType, MessageToServer, MessageToServerType } from "../apiTypes"
import { openPanel } from './panels';
import { Profile } from '../database/database';

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

async function sendAPIMessage(msg: MessageToServer): Promise<MessageToClient> {
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

async function createAccount(username: string, password: string, profile: Profile) {
    const passwordHash = await argon2id({
        password,
        salt: window.crypto.getRandomValues(new Uint8Array(16)),
        parallelism: 1,
        iterations: 3,
        memorySize: 65536,
        hashLength: 32,
        outputType: 'hex'
    });

    return await sendAPIMessage({
        type: MessageToServerType.ACCOUNT_CREATE,
        data: {
            username,
            passwordHash,
            profile
        }
    });
}

async function checkUsername(username: string): Promise<Boolean> {
    return (await sendAPIMessage({
        type: MessageToServerType.ACCOUNT_CHECK_USERNAME,
        data: {
            username
        }
    })).data === true;
}

const loginButton = document.querySelector(".login")
const signupButton = document.querySelector(".signup")

loginButton?.addEventListener("click", async(event)=>{
    const usernameInput = document.createElement("input");
    usernameInput.placeholder = "username";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "password";

    const loginButton = document.createElement("button");
    loginButton.innerText = "login";

    openPanel([usernameInput, passwordInput, loginButton]);
})

signupButton?.addEventListener("click", async(event)=>{
    const usernameInput = document.createElement("input");
    usernameInput.placeholder = "username";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "password";

    const signupButton = document.createElement("button");
    signupButton.innerText = "signup";

    const status = document.createElement("div");
    status.style.color = "red";
    status.style.textWrap = "break-word"

    function setStatus(color: string = "transparent", text: string = "") {
        status.innerText = text;
        status.style.color = color;
    }

    async function createACC() {
        if(passwordInput.value.trim().length < 5) {
            setStatus("red", "Password cannot be\n less than 5 characters");
            return;
        }

        if(usernameInput.value.trim().length === 0) {
            setStatus("red", "Username cannot be blank");
            return;
        }

        if(await checkUsername(usernameInput.value)) {
            setStatus("red", "Username Taken");
            return;
        }

        setStatus();
        
        const response = await createAccount(usernameInput.value, passwordInput.value, {});

        if(response.type == MessageToClientType.SUCCESS) {
            setStatus("green", "Account Created Successfully!");
            setTimeout(() => location.reload(), 500)
        } else if(response.type == MessageToClientType.FAIL) {
            if(response.data == ErrorToClientType.ACCOUNT_PASSWORD_INVALID) {
                setStatus("red", "Password cannot be\n less than 5 characters");
            }

            if(response.data == ErrorToClientType.ACCOUNT_EXISTS) {
                setStatus("red", "Username Taken");
            }
        }
    }

    passwordInput.addEventListener("input", async()=>{
        setStatus()
    })

    usernameInput.addEventListener("input", async()=>{
        if(usernameInput.value.trim().length === 0) {
            setStatus("red", "Username cannot be blank");
            return;
        }
        if(await checkUsername(usernameInput.value)) {
            setStatus("red", "Username taken");
        } else {
            setStatus("green", "Username available");
        }
    });

    signupButton.addEventListener("click", createACC)

    const panel = openPanel([usernameInput, passwordInput, signupButton, status]);

    panel.addEventListener("keydown", (ev)=>{
        if(ev.key == "Enter") {
            createACC()
        }
    })
})