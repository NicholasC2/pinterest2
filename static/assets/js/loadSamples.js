const gallery = document.querySelector(".gallery");
const trigger = document.getElementById("load-more-trigger");

let loading = false;
let imageId = 1;

async function loadImages(count = 20) {
    for (let i = 0; i < count; i++) {
        const width = 300;
        const height = (Math.floor(Math.random() * 10) * 50) + 100;

        const cacheBuster = Math.floor(Math.random() * 10000);

        const img = document.createElement("img");
        img.className = "gallery-item";
        img.src = `https://picsum.photos/${width}/${height}?random=${cacheBuster}`;

        gallery.appendChild(img);

        msnry._init()
    }
}

loadImages(30);