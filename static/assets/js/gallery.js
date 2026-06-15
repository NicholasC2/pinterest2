const gallery = document.querySelector(".gallery")

function loadItem() {
    const item = `<div class="loading"></div>`
    gallery.innerHTML+=item;
}

function onUpdate() {
    const columns = getComputedStyle(gallery)
        .gridTemplateColumns
        .split(' ')
        .length;

    const scroll = gallery.scrollTop+gallery.clientHeight;

    const maxScroll = gallery.scrollHeight

    if(scroll + 5 === maxScroll) {
        for(let i = 0; i < columns; i++) {
            loadItem();
        }
    }
}

setInterval(onUpdate, 16);