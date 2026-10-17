// Mantén esta lista sincronizada con products/: el alojamiento estático no puede enumerar sus archivos.
const productImageFiles = [
    "12bom1.jpeg",
    "12bom2.jpeg",
    "12bom3.jpeg",
    "12bom4.jpeg",
    "16navi1.jpeg",
    "16navi2.jpeg",
    "1navi.jpeg",
    "4bom1.jpeg",
    "4bom2.jpeg",
    "4bom3.jpeg",
    "4navi1.jpeg",
    "4navi2.jpeg",
    "4trufa.jpeg",
    "6bom1.jpeg",
    "6bom2.jpeg",
    "6bom3.jpeg",
    "6navi.jpeg",
    "6navi1.jpeg",
    "6navi2.jpeg",
    "almendracora (2).jpeg",
    "almendracora.jpeg",
    "almendramor (2).jpeg",
    "almendramor (3).jpeg",
    "almendramor (4).jpeg",
    "almendramor.jpeg",
    "arbol1.jpeg",
    "arbol2.jpeg",
    "arbol3.jpeg",
    "arbolitoschocolate.jpeg",
    "arbolpalo.jpeg",
    "barraflores.jpeg",
    "blancos4.jpeg",
    "bombonesnavi1.jpeg",
    "bonbon16 (2).jpeg",
    "bonbon16.jpeg",
    "bonbon4 (2).jpeg",
    "bonbon4 (3).jpeg",
    "bonbon4 (4).jpeg",
    "bonbon4(2).jpeg",
    "bonbon4.jpeg",
    "bonbon6 (2).jpeg",
    "bonbon6 (3).jpeg",
    "bonbon6 (4).jpeg",
    "bonbon6.jpeg",
    "bonbonavideño (2).jpeg",
    "bonbonavideño.jpeg",
    "bonboncorazon.jpeg",
    "bonbones(dorados).jpeg",
    "bonbones12.jpeg",
    "bonbonescoco.jpeg",
    "bonbonesflorales6 (2).jpeg",
    "bonbonesflorales6.jpeg",
    "bonbonflor.jpeg",
    "bonbonfloral12 (2).jpeg",
    "bonbonfloral12 (3).jpeg",
    "bonbonfloral12(2).jpeg",
    "bonbonfloral12.jpeg",
    "bonbonflores.jpeg",
    "cerezaschoco.jpeg",
    "chocoanimales (2).jpeg",
    "chocoanimales (3).jpeg",
    "chocoanimales.jpeg",
    "chocodorado16 (2).jpeg",
    "chocodorado16.jpeg",
    "chocoflores12.jpeg",
    "choconaranja.jpeg",
    "choconaranjitos.jpeg",
    "chocoquinua (2).jpeg",
    "chocoquinua.jpeg",
    "chocorelleno.jpeg",
    "chocoremedio (2).jpeg",
    "chocoremedio (3).jpeg",
    "chocoremedio.jpeg",
    "cubitoschocolate.jpeg",
    "florcho1.jpeg",
    "florcho2.jpeg",
    "florcho3.jpeg",
    "florcho4.jpeg",
    "floreschocolate (2).jpeg",
    "floreschocolate (3).jpeg",
    "floreschocolate.jpeg",
    "frutilla.jpeg",
    "frutillas8.jpeg",
    "halloween.jpeg",
    "mamachocolate.jpeg",
    "maniamor.jpeg",
    "muerdago.jpeg",
    "navibonbon (2).jpeg",
    "navibonbon.jpeg",
    "navibonbon16.jpeg",
    "navidad9.jpeg",
    "palonavi2.jpeg",
    "palosnavi.jpeg",
    "paraempresas.jpeg",
    "ramofrutillas (2).jpeg",
    "ramofrutillas.jpeg",
    "regalitoschocolate (2).jpeg",
    "regalitoschocolate (3).jpeg",
    "regalitoschocolate.jpeg",
    "trufa.jpeg",
    "trufadorada.jpeg",
    "trufaflor.jpeg",
    "trufanavidad.jpeg",
    "trufasmanjar (2).jpeg",
    "trufasmanjar.jpeg",
    "WhatsApp Image 2026-09-27 at 18.06.49 (1).jpeg",
    "WhatsApp Image 2026-10-16 at 23.17.55 (3).jpeg",
    "WhatsApp Image 2026-10-16 at 23.17.57 (2).jpeg",
    "WhatsApp Image 2026-10-16 at 23.17.58 (1).jpeg",
    "WhatsApp Image 2026-10-16 at 23.18.06 (2).jpeg",
    "WhatsApp Image 2026-10-16 at 23.18.22 (4).jpeg",
    "WhatsApp Image 2026-10-16 at 23.18.24.jpeg",
    "WhatsApp Image 2026-10-16 at 23.18.26 (2).jpeg",
];

const whatsappContact = "https://wa.me/message/OPAME3GXORHBC1";
const catalog = document.querySelector(".catalog");
const modal = document.querySelector(".image-modal");
const modalImage = modal.querySelector("img");
const modalTitle = modal.querySelector(".modal-title");
const closeButton = modal.querySelector(".modal-close");

function getImageStem(filename) {
    return filename.replace(/\.[^.]+$/, "");
}

function groupProductImages(filenames) {
    const groups = new Map();
    const sequenceGroups = new Map();

    // Agrupa copias con sufijos entre paréntesis y fotos numeradas del mismo producto.
    filenames.forEach((filename) => {
        const originalStem = getImageStem(filename);
        const parentheticalClone = originalStem.match(/^(.*?)\s*\(\d+\)$/);
        const stem = parentheticalClone ? parentheticalClone[1] : originalStem;
        const key = stem.toLocaleLowerCase();

        if (!groups.has(key)) {
            groups.set(key, { stem, files: [] });
        }
        groups.get(key).files.push({
            filename,
            originalStem,
            stem,
            isParentheticalClone: Boolean(parentheticalClone),
        });
    });

    groups.forEach((group, key) => {
        const numberedImage = group.stem.match(/^(.*?)(\d+)$/);
        if (!numberedImage || !numberedImage[1]) return;

        const root = numberedImage[1].toLocaleLowerCase();
        if (!sequenceGroups.has(root)) sequenceGroups.set(root, []);
        sequenceGroups.get(root).push({
            key,
            index: Number(numberedImage[2]),
        });
    });

    sequenceGroups.forEach((numberedGroups, root) => {
        const indices = [...new Set(numberedGroups.map((group) => group.index))].sort((a, b) => a - b);
        const isSequential = indices.length > 1
            && indices.every((index, position) => position === 0 || index === indices[position - 1] + 1);
        if (!isSequential && !groups.has(root)) return;

        const matchingGroups = groups.has(root)
            ? numberedGroups
            : numberedGroups.filter((group) => group.index >= indices[0] && group.index <= indices[indices.length - 1]);
        const merged = groups.get(root) || { stem: root, files: [] };
        matchingGroups.forEach(({ key }) => {
            if (key === root) return;
            const numberedGroup = groups.get(key);
            if (!numberedGroup) return;
            merged.files.push(...numberedGroup.files);
            groups.delete(key);
        });
        groups.set(root, merged);
    });

    return [...groups.entries()].map(([id, group]) => {
        const isGallery = group.files.length > 1;
        const singleNumberedImage = group.files[0].stem.match(/^(.*?)(\d+)$/);
        const nameStem = isGallery
            ? group.stem
            : group.files[0].isParentheticalClone
                ? group.files[0].stem
                : singleNumberedImage && singleNumberedImage[2] === "1"
                    ? singleNumberedImage[1]
                    : group.files[0].originalStem;

        return {
            id,
            name: formatProductName(nameStem),
            files: group.files
                .sort((first, second) => first.filename.localeCompare(second.filename, undefined, { numeric: true }))
                .map((file) => file.filename),
        };
    });
}

function formatProductName(stem) {
    return stem
        .replace(/[._()-]+/g, " ")
        .replace(/([a-záéíóúñ])(\d)/gi, "$1 $2")
        .replace(/(\d)([a-záéíóúñ])/gi, "$1 $2")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/(^|\s)([a-záéíóúñ])/gi, (_, space, letter) => space + letter.toLocaleUpperCase("es"));
}

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

function createGallery(product) {
    const gallery = createElement("div", "product-gallery");
    gallery.dataset.title = product.name;
    gallery.dataset.currentImage = "0";

    const imageButton = createElement("button", "product-image-button");
    imageButton.type = "button";
    imageButton.dataset.image = `products/${product.files[0]}`;
    imageButton.dataset.title = product.name;
    imageButton.setAttribute("aria-label", `Ampliar foto de ${product.name}`);

    const image = createElement("img");
    image.src = imageButton.dataset.image;
    image.alt = product.name;
    image.loading = "lazy";
    imageButton.append(image, createElement("span", "zoom-hint", "+"));
    gallery.append(imageButton);

    if (product.files.length > 1) {
        [-1, 1].forEach((direction) => {
            const label = direction < 0 ? "Ver foto anterior" : "Ver otra foto";
            const arrow = createElement(
                "button",
                `gallery-arrow ${direction < 0 ? "gallery-prev" : "gallery-next"}`,
                direction < 0 ? "‹" : "›",
            );
            arrow.type = "button";
            arrow.dataset.direction = String(direction);
            arrow.setAttribute("aria-label", `${label} de ${product.name}`);
            gallery.append(arrow);
        });

        const counter = createElement("span", "gallery-counter", `1 / ${product.files.length}`);
        counter.setAttribute("aria-live", "polite");
        gallery.append(counter);
        const galleryData = createElement("div", "gallery-data");
        galleryData.dataset.images = product.files.map((filename) => `products/${filename}`).join("|");
        gallery.append(galleryData);
    }

    return gallery;
}

function createProductCard(product) {
    const card = createElement("article", "product-card");
    card.append(createGallery(product));

    const info = createElement("div", "product-info");
    const titleRow = createElement("div", "product-title-row");
    titleRow.append(createElement("h3", "", product.name));
    info.append(titleRow);

    const description = createElement(
        "p",
        "description",
        "Consulta el precio y la disponibilidad por WhatsApp.",
    );
    info.append(description);

    const orderLink = createElement("a", "order-link", "Consultar por WhatsApp");
    const whatsappUrl = new URL(whatsappContact);
    whatsappUrl.searchParams.set(
        "text",
        `Hola, quisiera consultar por ${product.name}. ¿Me comparten el precio y la disponibilidad?`,
    );
    orderLink.href = whatsappUrl.toString();
    orderLink.target = "_blank";
    orderLink.rel = "noopener";
    info.append(orderLink);

    card.append(info);
    return card;
}

function renderCatalog() {
    const products = groupProductImages(productImageFiles);
    const imageGroups = new Map(products.flatMap((product) =>
        product.files.map((filename) => [filename, product.id]),
    ));
    const existingCards = new Map();

    // Conserva las tarjetas originales y sus precios y descripciones; solo amplía las galerías.
    catalog.querySelectorAll(".product-card").forEach((card) => {
        const gallery = card.querySelector(".product-gallery");
        const imageData = gallery.querySelector(".gallery-data");
        const files = imageData
            ? imageData.dataset.images.split("|").map((path) => path.split("/").pop())
            : [gallery.querySelector(".product-image-button").dataset.image.split("/").pop()];

        files.forEach((filename) => {
            const groupId = imageGroups.get(filename);
            if (!groupId) return;
            if (!existingCards.has(groupId)) {
                existingCards.set(groupId, { card, files: new Set() });
            }
            existingCards.get(groupId).files.add(filename);
        });
    });

    products.forEach((product) => {
        const existing = existingCards.get(product.id);
        if (existing) {
            const additionalFiles = product.files.filter((filename) => !existing.files.has(filename));
            if (additionalFiles.length) {
                const card = existing.card;
                const gallery = card.querySelector(".product-gallery");
                const imageData = gallery.querySelector(".gallery-data");
                const existingFiles = imageData
                    ? imageData.dataset.images.split("|").map((path) => path.split("/").pop())
                    : [gallery.querySelector(".product-image-button").dataset.image.split("/").pop()];
                const title = card.querySelector("h3").textContent;
                gallery.replaceWith(createGallery({
                    name: title,
                    files: [...existingFiles, ...additionalFiles],
                }));
            }
            return;
        }

        const sectionId = /nav|arbol|muerdago|trufanavidad/i.test(product.id)
            ? "navidad"
            : "bombons";
        const section = catalog.querySelector(`#${sectionId}`);
        section.querySelector(".product-grid").append(createProductCard(product));
    });

    catalog.querySelectorAll(".category-section").forEach((section) => {
        const count = section.querySelectorAll(".product-card").length;
        section.querySelector(".category-count").textContent = `${count} producto${count === 1 ? "" : "s"}`;
    });
}

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
}

renderCatalog();

document.addEventListener("click", (event) => {
    const imageButton = event.target.closest(".product-image-button");
    if (imageButton && catalog.contains(imageButton)) {
        modalImage.src = imageButton.dataset.image;
        modalImage.alt = imageButton.dataset.title;
        modalTitle.textContent = imageButton.dataset.title;
        modal.hidden = false;
        document.body.style.overflow = "hidden";
        closeButton.focus();
        return;
    }

    const control = event.target.closest(".gallery-arrow");
    if (control && catalog.contains(control)) {
        event.preventDefault();
        const gallery = control.closest(".product-gallery");
        const imageButtonForGallery = gallery.querySelector(".product-image-button");
        const image = imageButtonForGallery.querySelector("img");
        const images = gallery.querySelector(".gallery-data").dataset.images.split("|");
        const nextImage = (
            Number(gallery.dataset.currentImage) + Number(control.dataset.direction) + images.length
        ) % images.length;

        gallery.dataset.currentImage = String(nextImage);
        image.src = images[nextImage];
        imageButtonForGallery.dataset.image = images[nextImage];
        gallery.querySelector(".gallery-counter").textContent = `${nextImage + 1} / ${images.length}`;
        return;
    }

    if (event.target === modal) closeModal();
});

closeButton.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
});
