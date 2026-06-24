const cards = document.querySelectorAll("[data-expand-card]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (prefersReducedMotion) {
      return;
    }

    event.preventDefault();
    card.classList.add("is-expanding");
    document.body.classList.add("is-navigating");

    window.setTimeout(() => {
      window.location.href = card.href;
    }, 440);
  });
});
