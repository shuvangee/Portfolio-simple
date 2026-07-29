const posts = [
  {
    title: "Techicago Week",
    date: "June 22–24, 2026",
    image: "assets/accelerate-chicago-techicago-2026.jpg",
    captions: [
      "Volunteered at Accelerate Chicago for Techicago Week 2026"
    ]
  },
  {
    title: "SOAR",
    date: "May–August 2026",
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
  },
  {
    title: "Apple Meet & Connect",
    date: "November 7, 2025",
    fit: "contain",
    image: "assets/apple-meet-connect-2025-1.jpg",
    images: [
      "assets/apple-meet-connect-2025-1.jpg",
      "assets/apple-meet-connect-2025-2.jpg",
      "assets/apple-meet-connect-2025-3.jpg",
      "assets/apple-meet-connect-2025-4.jpg",
      "assets/apple-meet-connect-2025-5.jpg"
    ],
    captions: [
      "Apple's meet & connect event 2025"
    ]
  }
];

const sectionLinks = [...document.querySelectorAll(".section-nav a")];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveSection() {
  if (!observedSections.length) {
    return;
  }

  const marker = window.scrollY + window.innerHeight * 0.38;
  let activeSection = observedSections[0];

  observedSections.forEach((section) => {
    if (section.offsetTop <= marker) {
      activeSection = section;
    }
  });

  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSection.id}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

let sectionUpdateQueued = false;
window.addEventListener(
  "scroll",
  () => {
    if (sectionUpdateQueued) {
      return;
    }

    sectionUpdateQueued = true;
    window.requestAnimationFrame(() => {
      updateActiveSection();
      sectionUpdateQueued = false;
    });
  },
  { passive: true }
);

window.addEventListener("load", updateActiveSection);
window.addEventListener("hashchange", updateActiveSection);

document.querySelectorAll(".email-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const userAgent = navigator.userAgent || "";
    const isAndroid = /Android/i.test(userAgent);
    const isIOS =
      /iPhone|iPad|iPod/i.test(userAgent) ||
      (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1);

    if (!isAndroid && !isIOS) {
      return;
    }

    event.preventDefault();
    const email = link.dataset.email;
    const encodedEmail = encodeURIComponent(email);

    if (isAndroid) {
      const fallback = encodeURIComponent(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}`
      );
      window.location.href =
        `intent://co?to=${encodedEmail}` +
        `#Intent;scheme=googlegmail;package=com.google.android.gm;` +
        `S.browser_fallback_url=${fallback};end`;
      return;
    }

    window.location.href = `googlegmail:///co?to=${encodedEmail}`;
    window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        window.location.href = `mailto:${email}`;
      }
    }, 900);
  });
});

const modal = document.querySelector("#post-modal");
const postTitle = document.querySelector("#post-title");
const postDate = document.querySelector("#post-date");
const postCounter = document.querySelector("#post-counter");
const modalPhoto = document.querySelector(".modal-photo");
const modalImage = document.querySelector("#modal-image");
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
  postDate.textContent = post.date;
  postCounter.textContent = `${activeSlide + 1} / ${total}`;
  modalPhoto.classList.toggle("has-image", Boolean(image));
  modalImage.src = image || "";
  modalImage.alt = caption;
  modalImage.classList.toggle("is-contain", post.fit === "contain");
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
