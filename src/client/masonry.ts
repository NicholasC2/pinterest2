import Masonry from "masonry-layout";

const gallery = document.querySelector(".gallery");

if (!(gallery instanceof HTMLElement)) {
    throw new Error("Gallery not found");
}

const msnry = new Masonry(gallery, {
    itemSelector: ".gallery-item",
    columnWidth: ".grid-sizer",
    percentPosition: true,
});

export default msnry;

export function addImage(img: HTMLImageElement) {
    if (!(gallery instanceof HTMLElement)) {
        throw new Error("Gallery not found");
    }

    const item = document.createElement("div");
    item.className = "gallery-item";
    item.appendChild(img);

    gallery.appendChild(item);

    msnry.appended?.([item]);
    msnry.layout?.();
}