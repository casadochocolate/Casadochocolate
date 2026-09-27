const modal = document.querySelector(".image-modal");
const modalImage = modal.querySelector("img");
const modalTitle = modal.querySelector(".modal-title");
const closeButton = modal.querySelector(".modal-close");
const modalPrev = modal.querySelector(".modal-prev");
const modalNext = modal.querySelector(".modal-next");
let modalImages = [];
let modalIndex = 0;

function updateGalleryState(gallery, nextIndex) {
    const imageButton = gallery.querySelector(".product-image-button");
    const image = imageButton.querySelector("img");
    const imageList = gallery.querySelector(".gallery-data");
    const counter = gallery.querySelector(".gallery-counter");
    const images = imageList ? imageList.dataset.images.split("|") : [imageButton.dataset.image];
    const current = Number(gallery.dataset.currentImage || 0);
    const safeIndex = typeof nextIndex === "number" ? nextIndex : current;
    const normalized = (safeIndex + images.length) % images.length;

    gallery.dataset.currentImage = normalized;
    image.src = images[normalized];
    imageButton.dataset.image = images[normalized];

    if (counter) {
        counter.textContent = `${normalized + 1} / ${images.length}`;
    }
}

function renderModalImage() {
    if (!modalImages.length) return;
    const image = modalImages[modalIndex];
    modalImage.src = image;
    modalImage.alt = modalTitle.textContent || "Producto";
}

function openModalForGallery(gallery) {
    const galleryData = gallery.querySelector(".gallery-data");
    const images = galleryData ? galleryData.dataset.images.split("|") : [gallery.querySelector(".product-image-button").dataset.image];

    modalImages = images;
    modalIndex = Number(gallery.dataset.currentImage || 0);
    modalTitle.textContent = gallery.dataset.title || "Producto";
    renderModalImage();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
}

function changeModalImage(direction) {
    if (!modalImages.length) return;
    modalIndex = (modalIndex + direction + modalImages.length) % modalImages.length;
    renderModalImage();
}

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
}

document.querySelectorAll(".product-gallery").forEach((gallery) => {
    const imageList = gallery.querySelector(".gallery-data");
    if (imageList && imageList.dataset.images) {
        const images = imageList.dataset.images.split("|");
        if (images.length > 1) {
            gallery.dataset.currentImage = gallery.dataset.currentImage || 0;
            updateGalleryState(gallery, Number(gallery.dataset.currentImage));
        }
    }
});

document.querySelectorAll(".product-image-button").forEach((button) => {
    button.addEventListener("click", () => {
        const gallery = button.closest(".product-gallery");
        openModalForGallery(gallery);
    });
});

document.addEventListener("click", (event) => {
    const control = event.target.closest(".gallery-arrow");
    if (!control) return;

    event.preventDefault();
    event.stopPropagation();

    const gallery = control.closest(".product-gallery");
    const current = Number(gallery.dataset.currentImage || 0);
    const direction = Number(control.dataset.direction || 0);
    const nextIndex = (current + direction + 9999) % 9999;
    const imageList = gallery.querySelector(".gallery-data");
    const images = imageList.dataset.images.split("|");
    const normalized = (current + direction + images.length) % images.length;

    updateGalleryState(gallery, normalized);

    if (!modal.hidden) {
        modalIndex = normalized;
        modalTitle.textContent = gallery.dataset.title || "Producto";
        renderModalImage();
    }
});

modalPrev.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    changeModalImage(-1);
});

modalNext.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    changeModalImage(1);
});

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
    if (!modal.hidden && event.key === "ArrowLeft") changeModalImage(-1);
    if (!modal.hidden && event.key === "ArrowRight") changeModalImage(1);
});
