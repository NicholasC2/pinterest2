const gallery = document.querySelector(".gallery");
const trigger = document.getElementById("load-more-trigger");

let loading = false;
let imageId = 1;

async function loadImages(count = 20) {
    for (let i = 0; i < count; i++) {
        const width = 300;
        const height = (Math.floor(Math.random() * 10) * 50) + 100;

        const cacheBuster = Math.floor(Math.random() * 10000);

        const div = document.createElement("div");
        div.className = "gallery-item";

        const img = document.createElement("img");
        img.src = `https://picsum.photos/${width}/${height}?random=${cacheBuster}`;

        div.appendChild(img);
        gallery.appendChild(div);

        msnry.appended([div]);

        img.onload = () => {
            msnry.layout();
        }
    }
}

function onScroll() {
    if(gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight - 500) {
        loadImages(10);
    }
}

setInterval(onScroll, 1000);