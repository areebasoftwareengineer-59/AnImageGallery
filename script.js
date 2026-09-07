const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("caption");
const favoriteBtn = document.getElementById("favoriteBtn");

let currentIndex = 0;
let favorites = [];

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    showImage();
}

function showImage() {
    const image = images[currentIndex];

    lightboxImg.src = image.src;
    caption.textContent = image.dataset.caption;

    updateFavoriteButton();

    lightboxImg.style.animation = "none";
    lightboxImg.offsetHeight;
    lightboxImg.style.animation = "fadeIn 0.4s ease";
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function changeImage(step) {
    currentIndex += step;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    showImage();
}

document.addEventListener("keydown", function(event) {
    if (lightbox.style.display !== "flex") {
        return;
    }

    if (event.key === "ArrowRight") {
        changeImage(1);
    }

    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }

    if (event.key === "Escape") {
        closeLightbox();
    }
});

function filterImages(category) {
    const items = document.querySelectorAll(".image");

    items.forEach(function(item) {
        if (category === "all") {
            item.classList.remove("hidden");
        } else if (item.classList.contains(category)) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });
}

function toggleFavorite() {
    if (favorites.includes(currentIndex)) {
        favorites = favorites.filter(function(index) {
            return index !== currentIndex;
        });
    } else {
        favorites.push(currentIndex);
    }

    updateFavoriteButton();
}

function updateFavoriteButton() {
    if (favorites.includes(currentIndex)) {
        favoriteBtn.textContent = "❤️ Favorited";
    } else {
        favoriteBtn.textContent = "♡ Add to Favorites";
    }
}

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
        return;
    }

    if (swipeDistance < 0) {
        changeImage(1);
    } else {
        changeImage(-1);
    }
}