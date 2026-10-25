const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");
const currentYear = document.querySelector("#current-year");

function closeMenu() {
  if (!menuToggle || !mainNav) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  mainNav.classList.remove("is-open");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );

    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* CONTACT FORM DEMO */
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();

    formFeedback.textContent =
      `Thanks, ${name}! This is a demo confirmation. Your inquiry was not sent or saved.`;

    formFeedback.hidden = false;
  });
}

/* SCROLL REVEAL */
const revealSections = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
    }
  );

  revealSections.forEach((section) => {
    revealObserver.observe(section);
  });
} else {
  revealSections.forEach((section) => {
    section.classList.add("is-visible");
  });
}

/* FLOATING BACK-TO-TOP BUTTON */
const floatingTopButton = document.querySelector("#back-to-top-floating");

if (floatingTopButton) {
  const updateTopButton = () => {
    floatingTopButton.classList.toggle("is-visible", window.scrollY > 450);
  };

  window.addEventListener("scroll", updateTopButton, { passive: true });
  updateTopButton();

  floatingTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  });
}

/* ACTIVE SECTION INDICATOR */

const trackedNavLinks = document.querySelectorAll(
  '.main-nav a[data-nav-link][href^="#"]'
);

const trackedSections = Array.from(trackedNavLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveNavLink() {
  let activeSection = trackedSections[0];

  const activationPoint = window.scrollY + window.innerHeight * 0.35;

  trackedSections.forEach((section) => {
    if (section.offsetTop <= activationPoint) {
      activeSection = section;
    }
  });

  if (!activeSection) return;

  trackedNavLinks.forEach((link) => {
    const isActive =
      link.getAttribute("href") === `#${activeSection.id}`;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink, {
  passive: true,
});

window.addEventListener("resize", updateActiveNavLink);

window.addEventListener("load", updateActiveNavLink);

updateActiveNavLink();
