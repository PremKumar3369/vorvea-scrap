/* Editable business details. Update the phone number here when it changes. */
const VORVEA_CONFIG = {
  brand: 'VORVEA',
  phone: '8884521351',
  whatsapp: '918884521351',
  whatsappMessage: 'Hi! I am interested in selling industrial scrap. Can we discuss the materials and collection?',
  email: '', // Add a verified enquiry email when available.
  serviceArea: 'Peenya Industrial Area, Bengaluru, Karnataka, India',
  mapEmbedUrl: '' // Optional configured map URL. The service-area block is shown by default.
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

function closeMenu(returnFocus = false) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
    if (open) navigation.querySelector('a')?.focus();
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();

const formattedPhone = VORVEA_CONFIG.phone;
document.querySelectorAll('[data-phone-link]').forEach(link => {
  link.href = `tel:${VORVEA_CONFIG.phone}`;
});
document.querySelectorAll('[data-phone-number]').forEach(label => {
  label.textContent = formattedPhone;
});
document.querySelectorAll('[data-whatsapp-link]').forEach(link => {
  link.href = `https://wa.me/${VORVEA_CONFIG.whatsapp}?text=${encodeURIComponent(VORVEA_CONFIG.whatsappMessage)}`;
});

/* Lenis provides smooth scrolling when available; native scrolling remains the fallback. */
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const lenis = window.Lenis && !reduceMotionQuery.matches
  ? new window.Lenis({ autoRaf: true, anchors: false, smoothWheel: true })
  : null;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.getElementById(href.slice(1));

    if (!target) return;

    event.preventDefault();

    // Close mobile menu without interfering with scrolling
    if (menuButton && navigation) {
      closeMenu();
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const header = document.querySelector(".site-header");
    const headerHeight = header
      ? header.getBoundingClientRect().height
      : 0;

    const targetY =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    if (lenis && !reducedMotion) {
      lenis.scrollTo(target, { offset: -headerHeight });
    } else {
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: reducedMotion ? "auto" : "smooth"
      });
    }

    history.replaceState(null, "", href);
  });
});

/* ==========================================
   VORVEA â€” Smooth image hover zoom
   ========================================== */

document.querySelectorAll(
  ".about-image img, .material-tile img"
).forEach((img) => {
  img.style.transition =
    "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";

  img.style.transform = "scale(1)";

  const container = img.closest(".about-image, .material-tile");

  if (!container) return;

  container.addEventListener("mouseenter", () => {
    img.style.transform = "scale(1.07)";
  });

  container.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});
