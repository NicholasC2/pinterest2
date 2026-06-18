let panel = document.createElement("div");

export function openPanel(elements: HTMLElement[]) {
    panel.remove();

    const panelBackground = document.createElement("div");
    panelBackground.className = "panel-background";

    document.body.appendChild(panelBackground);

    panel.className = "panel"
    document.body.appendChild(panel);

    panel.replaceChildren(...elements);

    function closePanel() {
        panel.remove();
        panelBackground.remove();
    }

    const closeButton = document.createElement("button");
    closeButton.onclick = closePanel

    panel.tabIndex = -1;
    panel.focus();

    panelBackground.addEventListener("click", (e) => {
        closePanel();
    });

    closeButton.className = "close"
    closeButton.innerHTML = "x"

    panel.appendChild(closeButton)

    return panel;
}