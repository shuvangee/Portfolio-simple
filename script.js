const posts = [
  {
    title: "Techicago Week",
    image: "assets/accelerate-chicago-techicago-2026.jpg",
    captions: [
      "Volunteered at Accelerate Chicago for Techicago Week 2026"
    ]
  },
  {
    title: "SOAR",
    image: "assets/soar-iit-2026.jpg",
    images: [
      "assets/soar-iit-2026.jpg",
      "assets/soar-iit-2026-2.gif",
      "assets/soar-iit-2026-3.jpg",
      "assets/soar-iit-2026-4.jpg",
      "assets/soar-iit-2026-5.jpg",
      "assets/soar-iit-2026-6.jpg"
    ],
    captions: [
      "SOAR @ IIT 2026"
    ]
  }
];

const modal = document.querySelector("#post-modal");
const postTitle = document.querySelector("#post-title");
const postCounter = document.querySelector("#post-counter");
const modalPhoto = document.querySelector(".modal-photo");
const closeButton = document.querySelector(".modal-close");
const prevButton = document.querySelector(".modal-prev");
const nextButton = document.querySelector(".modal-next");
let activePost = 0;
let activeSlide = 0;

function renderPost() {
  const post = posts[activePost];
  const images = post.images || (post.image ? [post.image] : []);
  const caption = post.captions[activeSlide] || post.captions[0];
  const image = images[activeSlide] || images[0];
  const total = Math.max(images.length, post.captions.length);

  postTitle.textContent = caption;
  postCounter.textContent = `${activeSlide + 1} / ${total}`;
  modalPhoto.style.backgroundImage = image ? `url("${image}")` : "";
  modalPhoto.classList.toggle("has-image", Boolean(image));
}

function openPost(index) {
  activePost = index;
  activeSlide = 0;
  renderPost();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closePost() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function changeSlide(direction) {
  const post = posts[activePost];
  const total = Math.max((post.images || []).length, post.captions.length);
  activeSlide = (activeSlide + direction + total) % total;
  renderPost();
}

document.querySelectorAll("[data-post]").forEach((button) => {
  button.addEventListener("click", () => openPost(Number(button.dataset.post)));
});

closeButton.addEventListener("click", closePost);
prevButton.addEventListener("click", () => changeSlide(-1));
nextButton.addEventListener("click", () => changeSlide(1));

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closePost();
  }
});

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closePost();
  }

  if (event.key === "ArrowLeft") {
    changeSlide(-1);
  }

  if (event.key === "ArrowRight") {
    changeSlide(1);
  }
});
