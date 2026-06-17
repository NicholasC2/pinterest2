export function createPanel(elements: HTMLElement[]) {
    const panel = document.createElement("div");

    elements.forEach((element) => {
        panel.appendChild(element)
    })

    return panel;
}