const posts = [
  {
    title: "Design notes",
    captions: [
      "Sketching interfaces that feel quieter and easier to use.",
      "Blank placeholder for another design note.",
      "A tiny layout idea saved for later."
    ]
  },
  {
    title: "Campus days",
    captions: [
      "Little moments from student life at Illinois Tech.",
      "A placeholder for a campus snapshot.",
      "A soft pause between classes and projects."
    ]
  },
  {
    title: "Current reads",
    captions: [
      "Books and essays that make product thinking sharper.",
      "A reading list placeholder.",
      "Notes from something worth remembering."
    ]
  },
  {
    title: "Hobby desk",
    captions: [
      "Journals, sketches, and tiny product ideas.",
      "A placeholder for the desk setup.",
      "Where quiet hobbies turn into new ideas."
    ]
  },
  {
    title: "Reset rituals",
    captions: [
      "Music, walks, and small routines that reset the day.",
      "A blank frame for a reset moment.",
      "Simple things that make work feel lighter."
    ]
  },
  {
    title: "Tiny ideas",
    captions: [
      "The small problems that become project prompts.",
      "A placeholder for idea scraps.",
      "Collected thoughts for future builds."
    ]
  }
];

const modal = document.querySelector("#post-modal");
const postTitle = document.querySelector("#post-title");
const postCounter = document.querySelector("#post-counter");
const closeButton = document.querySelector(".modal-close");
const prevButton = document.querySelector(".modal-prev");
const nextButton = document.querySelector(".modal-next");
let activePost = 0;
let activeSlide = 0;

function renderPost() {
  const post = posts[activePost];
  postTitle.textContent = post.captions[activeSlide];
  postCounter.textContent = `${activeSlide + 1} / ${post.captions.length}`;
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
  const total = posts[activePost].captions.length;
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
