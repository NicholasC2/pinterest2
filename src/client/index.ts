import { Account, Session } from "../database/database";
import { MessageToServerType } from "../apiTypes";
import msnry, { addImage } from "./masonry";

let errorList = document.querySelector("div.error-list")

let fileInput = document.querySelector("input.fileInput")

if(fileInput instanceof HTMLInputElement) {
    fileInput.addEventListener("input", async(ev)=>{
        if(!fileInput.files) return;
        for(let i = 0; i < fileInput.files.length; i++) {
            const file = fileInput.files[i]

            fetch("./api/upload", {
                method: "POST",
                body: JSON.stringify({
                    type: MessageToServerType.UPLOAD_IMAGE,
                    data: {
                        fileName: file.name,
                        base64: btoa(await file.text())
                    }
                })
            })
        }
    })
}

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

fetch("/api").catch(()=>{
    showError(HTMLErrorType.FAIL, "Server Connection Failed! Reloading...");
    setTimeout(()=>location.reload(), 1000);
}).then(async(res) => {
    if(res) {
        if(res.status != 200) {
            showError(HTMLErrorType.FAIL, "Server Connection Failed! Reloading...");
            setTimeout(()=>location.reload(), 1000);
        }
    }
})