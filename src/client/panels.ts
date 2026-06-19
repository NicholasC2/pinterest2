let panel = document.createElement("div");

const panelBackground = document.createElement("div");
panelBackground.className = "panel-background";

export function openPanel(elements: HTMLElement[], willClose: boolean = true) {
    panel.remove();

    document.body.appendChild(panelBackground);

    panel.className = "panel"
    document.body.appendChild(panel);

    panel.replaceChildren(...elements);

    function closePanel() {
        panel.remove();
        panelBackground.remove();
    }

    panel.tabIndex = -1;
    panel.focus();

    panelBackground.onclick = (e) => {
        if(!willClose) return;
        closePanel();
    };

    return {panel, closePanel};
}