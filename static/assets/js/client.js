"use strict";
(() => {
  // src/client/index.ts
  var errorList = document.querySelector("div.error-list");
  var fileInput = document.querySelector("input.fileInput");
  if (fileInput instanceof HTMLInputElement) {
    fileInput.addEventListener("input", async (ev) => {
      if (!fileInput.files) return;
      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        fetch("./api/upload", {
          method: "POST",
          body: JSON.stringify({
            type: 1 /* UPLOAD_IMAGE */,
            data: {
              fileName: file.name,
              base64: btoa(await file.text())
            }
          })
        });
      }
    });
  }
  function showError(type, message) {
    if (!errorList) {
      errorList = document.createElement("div");
      errorList.className = "error-list";
      document.body.appendChild(errorList);
    }
    const error = document.createElement("div");
    error.innerHTML = message;
    error.className = "error-message " + type;
    errorList.appendChild(error);
  }
  fetch("/api").catch(() => {
    showError("fail" /* FAIL */, "Server Connection Failed! Reloading...");
    setTimeout(() => location.reload(), 1e3);
  }).then(async (res) => {
    if (res) {
      if (res.status != 200) {
        showError("fail" /* FAIL */, "Server Connection Failed! Reloading...");
        setTimeout(() => location.reload(), 1e3);
      }
    }
  });
})();
