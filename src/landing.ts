// landing.ts — all non-terminal page behaviour
// Navbar scroll, scroll reveal with stagger, smooth anchor scroll
// Does NOT touch the terminal or #terminal element

function initNavbar(): void {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const SCROLL_THRESHOLD = 60;
  function updateNav(): void {
    nav!.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

function initScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('.landing-page [data-animate]');
  if (!elements.length) return;

  function applyStagger(parent: Element): void {
    const children = Array.from(
      parent.querySelectorAll<HTMLElement>(':scope > [data-animate]')
    );
    if (children.length < 2) return;
    children.forEach((child, index) => {
      child.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;
    });
  }

  document.querySelectorAll('.projects-grid, .timeline, .skills-grid, .hero-left')
    .forEach(applyStagger);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Module scripts are deferred — DOM is already parsed at this point.
// Do NOT use DOMContentLoaded here; it may have already fired.
initNavbar();
initScrollReveal();
initSmoothScroll();