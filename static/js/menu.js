const modal = document.querySelector(".image-modal");
const modalImage = modal.querySelector("img");
const modalTitle = modal.querySelector(".modal-title");
const closeButton = modal.querySelector(".modal-close");

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
}

document.querySelectorAll(".product-image-button").forEach((button) => {
    button.addEventListener("click", () => {
        modalImage.src = button.dataset.image;
        modalImage.alt = button.dataset.title;
        modalTitle.textContent = button.dataset.title;
        modal.hidden = false;
        document.body.style.overflow = "hidden";
        closeButton.focus();
    });
});

document.addEventListener("click", (event) => {
    const control = event.target.closest(".gallery-arrow");
    if (!control) return;

    event.preventDefault();
    event.stopPropagation();

    const gallery = control.closest(".product-gallery");
    const imageButton = gallery.querySelector(".product-image-button");
    const image = imageButton.querySelector("img");
    const imageList = gallery.querySelector(".gallery-data");
    const counter = gallery.querySelector(".gallery-counter");
    const images = imageList.dataset.images.split("|");
    const currentImage = (Number(gallery.dataset.currentImage || 0) + Number(control.dataset.direction) + images.length) % images.length;

    gallery.dataset.currentImage = currentImage;
    image.src = images[currentImage];
    imageButton.dataset.image = images[currentImage];
    counter.textContent = `${currentImage + 1} / ${images.length}`;
});

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
});
