document.documentElement.classList.add("js");

const products = [
  { name: "Ultra Thin Cotton Anion Napkin", size: "240 mm", category: "anion", image: "img01.jpg" },
  { name: "Ultra Thin Cotton Napkin", size: "240 mm", category: "regular", image: "img05.jpg" },
  { name: "Ultra Thin Cotton Anion Napkin", size: "280 mm", category: "anion", image: "img02.jpg" },
  { name: "Aluminium Foil Anion Napkin", size: "280 mm", category: "anion", image: "img04.jpg" },
  { name: "Ultra Thin Cotton Napkin", size: "280 mm", category: "regular", image: "img07.jpg" },
  { name: "Thick Cotton Pad", size: "280 mm", category: "regular", image: "img08.jpg" },
  { name: "Organic Pad", size: "280 mm", category: "regular", image: "img011.jpg" },
  { name: "Ultra Thin Cotton Pad", size: "320 mm", category: "regular", image: "img09.jpg" },
  { name: "Thick Cotton Pad", size: "320 mm", category: "regular", image: "img010.jpg" },
  { name: "Organic Pad", size: "320 mm", category: "regular", image: "img012.jpg" },
  { name: "Ultra Thin Cotton Anion Napkin", size: "350 mm", category: "anion", image: "img03.jpg" },
  { name: "Bamboo Napkin", size: "280 mm", category: "nature", image: "img014.png", tag: "Bamboo" },
  { name: "Bamboo Napkin", size: "320 mm", category: "nature", image: "img015.png", tag: "Bamboo" },
  { name: "Herbal Napkin", size: "260 mm", category: "nature", image: "img016.png", tag: "Herbal" },
  { name: "Herbal Napkin", size: "320 mm", category: "nature", image: "img017.png", tag: "Herbal" }
];

const categoryLabels = {
  anion: "Anion",
  regular: "Regular",
  nature: "Nature-led"
};

const grid = document.querySelector("[data-product-grid]");
const filters = [...document.querySelectorAll("[data-filter]")];

function createProductCard(product, index) {
  const article = document.createElement("article");
  article.className = "product-card reveal";
  article.style.setProperty("--card-index", index);
  article.dataset.productPreview = "";
  article.dataset.productName = product.name;
  article.dataset.productSize = product.size;
  article.dataset.productImage = `assets/images/${product.image}`;
  article.innerHTML = `
    <button class="product-card__media" type="button" aria-label="View full image of ${product.name}, ${product.size}" data-preview>
      <img src="assets/images/${product.image}" alt="${product.name}, ${product.size}" loading="lazy" />
      <span class="product-card__tag">${product.tag || categoryLabels[product.category]}</span>
      <span class="product-card__view">View full image <span aria-hidden="true">↗</span></span>
    </button>
    <div class="product-card__body">
      <h3>${product.name}</h3>
      <div class="product-card__meta">
        <span class="product-card__size">${product.size}</span>
        <button class="product-card__enquire" type="button" data-enquire="${product.name} — ${product.size}">Enquire <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  `;
  return article;
}

function renderProducts(filter = "all") {
  if (!grid) return;
  const visibleProducts = filter === "all" ? products : products.filter((product) => product.category === filter);
  grid.replaceChildren(...visibleProducts.map(createProductCard));
  observeReveals(grid.querySelectorAll(".reveal"));
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => {
      const isCurrent = item === button;
      item.classList.toggle("is-active", isCurrent);
      item.setAttribute("aria-pressed", String(isCurrent));
    });
    renderProducts(button.dataset.filter);
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let revealObserver;

if (!reducedMotion && "IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );
}

function observeReveals(elements = document.querySelectorAll(".reveal")) {
  elements.forEach((element) => {
    if (revealObserver) revealObserver.observe(element);
    else element.classList.add("is-visible");
  });
}

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

function closeNav() {
  if (!navToggle || !nav) return;
  navToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}

navToggle?.addEventListener("click", () => {
  const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
  navToggle.setAttribute("aria-expanded", String(willOpen));
  nav?.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("nav-open", willOpen);
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
window.addEventListener("resize", () => {
  if (window.innerWidth > 880) closeNav();
});

const header = document.querySelector("[data-header]");
const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]:not(.button)')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
    },
    { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] }
  );
  observedSections.forEach((section) => sectionObserver.observe(section));

  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    const contactObserver = new IntersectionObserver(
      ([entry]) => document.body.classList.toggle("contact-in-view", entry.isIntersecting),
      { threshold: 0.08 }
    );
    contactObserver.observe(contactSection);
  }
}

const form = document.querySelector("[data-enquiry-form]");
const subjectField = document.querySelector("[data-subject]");
const messageField = document.querySelector("[data-message]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxSize = document.querySelector("[data-lightbox-size]");
const lightboxCloseButton = lightbox?.querySelector(".image-lightbox__close");
let lightboxTrigger;

function openLightbox(card) {
  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxSize) return;
  lightboxTrigger = document.activeElement;
  lightboxImage.src = card.dataset.productImage;
  lightboxImage.alt = `${card.dataset.productName}, ${card.dataset.productSize} — full image`;
  lightboxTitle.textContent = card.dataset.productName;
  lightboxSize.textContent = card.dataset.productSize;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxCloseButton?.focus();
}

function closeLightbox() {
  if (!lightbox || lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
  if (lightboxImage) {
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }
  lightboxTrigger?.focus?.();
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const whatsappNumber = form.dataset.whatsapp;
  const whatsappMessage = [
    "Hello Maquitesafe team,",
    "",
    "I would like to make an enquiry.",
    "",
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    `Phone: ${formData.get("phonenumber")}`,
    `Subject: ${formData.get("subject")}`,
    "",
    "Message:",
    formData.get("message")
  ].join("\n");

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-lightbox-close]")) {
    closeLightbox();
    return;
  }

  const trigger = event.target.closest("[data-enquire]");
  if (trigger) {
    event.preventDefault();
    const product = trigger.dataset.enquire;
    if (subjectField) subjectField.value = `Enquiry about ${product}`;
    if (messageField) messageField.value = `Hello, I would like to know the price and availability for ${product}. Please share the wholesale details.`;
    form?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    window.setTimeout(() => subjectField?.focus({ preventScroll: true }), reducedMotion ? 0 : 650);
    return;
  }

  const productCard = event.target.closest("[data-product-preview]");
  if (productCard && !event.target.closest("a, button:not([data-preview])")) {
    openLightbox(productCard);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  if (event.key === "Tab" && lightbox && !lightbox.hidden) {
    event.preventDefault();
    lightboxCloseButton?.focus();
  }
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

renderProducts();
observeReveals();
