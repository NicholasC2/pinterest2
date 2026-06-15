const gallery = document.querySelector(".gallery");

const MIN_WIDTH = 150;
const MAX_WIDTH = 250;

let imageIndex = 0;

/* -----------------------------
   TRACK HEIGHTS MANUALLY (IMPORTANT FIX)
------------------------------*/
let colHeights = [];

/* -----------------------------
   IMAGE
------------------------------*/
function generateImage(i) {
    const h = Math.floor(Math.random() * 200) + 100;
    return `https://picsum.photos/seed/${i}/200/${h}`;
}

/* -----------------------------
   COLUMNS
------------------------------*/
function getColumnCount() {
    const w = gallery.clientWidth;

    let count = Math.floor(w / MIN_WIDTH);
    const maxFit = Math.floor(w / MAX_WIDTH);

    return Math.max(1, Math.min(count, maxFit || count));
}

function ensureColumns() {
    const count = getColumnCount();

    if (gallery.children.length === count) return;

    gallery.innerHTML = "";
    colHeights = new Array(count).fill(0); // reset tracking

    for (let i = 0; i < count; i++) {
        const col = document.createElement("div");
        col.className = "col";
        gallery.appendChild(col);
    }
}

/* -----------------------------
   ADD ONE (FIXED SHORT COLUMN LOGIC)
------------------------------*/
function addOne() {
    ensureColumns();

    const cols = [...gallery.children];

    // find shortest using tracked heights (NOT DOM)
    let minIndex = 0;

    for (let i = 1; i < colHeights.length; i++) {
        if (colHeights[i] < colHeights[minIndex]) {
            minIndex = i;
        }
    }

    const item = document.createElement("div");
    item.className = "gallery-item";

    const img = document.createElement("img");
    img.src = generateImage(imageIndex++);

    img.style.width = "100%";
    img.style.display = "block";

    item.appendChild(img);
    cols[minIndex].appendChild(item);

    // IMPORTANT: estimate height immediately
    const estimatedHeight = Math.floor(Math.random() * 200) + 100;

    colHeights[minIndex] += estimatedHeight;
}

/* -----------------------------
   INITIAL FILL (fixes bias)
------------------------------*/
function seedInitial() {
    ensureColumns();

    const cols = getColumnCount();

    for (let i = 0; i < cols * 3; i++) {
        addOne();
    }
}

/* -----------------------------
   INFINITE SCROLL (FIXED)
------------------------------*/
let loading = false;

function onScroll() {
    const scrollTop = gallery.scrollY;
    const windowHeight = gallery.innerHeight;
    const docHeight = gallery.scrollHeight;

    // when near bottom of page
    if (scrollTop + windowHeight >= docHeight - 300) {
        if (loading) return;

        loading = true;

        // generate a small burst so scroll doesn't "stall"
        requestAnimationFrame(() => {
            for (let i = 0; i < 10; i++) {
                addOne();
            }
            loading = false;
        });
    }
}

window.addEventListener("scroll", onScroll);

/* -----------------------------
   RESIZE (simple + safe)
------------------------------*/
let timeout;

window.addEventListener("resize", () => {
    clearTimeout(timeout);

    const scrollY = window.scrollY;

    timeout = setTimeout(() => {
        const items = [...document.querySelectorAll(".gallery-item")];

        ensureColumns();

        const cols = [...gallery.children];
        cols.forEach(c => (c.innerHTML = ""));

        colHeights = new Array(cols.length).fill(0);

        for (const item of items) {
            let minIndex = 0;

            for (let i = 1; i < colHeights.length; i++) {
                if (colHeights[i] < colHeights[minIndex]) {
                    minIndex = i;
                }
            }

            cols[minIndex].appendChild(item);

            // estimate again (stable fake height)
            colHeights[minIndex] += 150;
        }

        window.scrollTo(0, scrollY);
    }, 100);
});

/* -----------------------------
   START
------------------------------*/
seedInitial();