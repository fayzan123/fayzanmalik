# Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the CLI-only portfolio into a polished, scrollable landing page with the existing CLI embedded as an interactive hero feature.

**Architecture:** Extend the existing Vite + TypeScript stack with no new dependencies. `index.html` is rebuilt with all sections; `src/landing.ts` is new and owns all non-terminal page behaviour (navbar scroll, scroll reveal animations, smooth scroll). All terminal source files are untouched. The impeccable skills pipeline refines the visual output after each implementation phase.

**Tech Stack:** TypeScript, Vite, vanilla CSS (CSS custom properties + grid/flexbox), Google Fonts (Inter + JetBrains Mono), IntersectionObserver API, impeccable skills plugin.

**Spec:** `docs/superpowers/specs/2026-04-11-landing-page-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `index.html` | Rebuild | Full page HTML: navbar, hero, experience, projects, skills, education, footer |
| `src/style.css` | Extend | Landing page CSS appended after existing terminal styles |
| `src/landing.ts` | Create | Navbar scroll, IntersectionObserver scroll reveals with stagger, smooth anchor scroll |
| `src/main.ts` | Untouched | Terminal only — already uses `#terminal` which exists in new index.html |
| All other `src/` files | Untouched | Terminal stack — no changes |

---

## ✅ Task 1: Run `/impeccable teach` — DONE
## ✅ Task 2: CSS Foundation — DONE
## ✅ Task 3: Rebuild index.html — DONE

---

## Task 4: Run `/shape`

- [ ] Run `/shape` — provide context: landing page for developer portfolio, 2-col hero (content left, CLI right), dark terminal aesthetic
- [ ] Apply any structural suggestions
- [ ] Commit: `git add -A && git commit -m "chore: apply shape skill"`

---

## Task 5: Landing Page CSS — All Sections

**File:** `src/style.css` — append to the landing page block

### Navbar CSS
```css
/* ── Navbar ─────────────────────────────────────────────── */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 200ms ease, backdrop-filter 200ms ease;
}

.nav.scrolled {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-landing);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.nav-logo:hover { color: var(--accent); }

.nav-links {
  list-style: none;
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: none;
  position: relative;
  transition: color 200ms ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms ease;
}

.nav-links a:hover { color: var(--text-landing); }
.nav-links a:hover::after { transform: scaleX(1); }
```

### Hero CSS
```css
/* ── Hero ───────────────────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
}

.hero-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  width: 100%;
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-headshot {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--accent);
  margin-bottom: 12px;
}

.hero-name {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 800;
  color: var(--text-landing);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-accent-line {
  height: 2px;
  background: var(--accent);
  width: 0;
  animation: accentLineGrow 600ms ease-out 300ms forwards;
}

@keyframes accentLineGrow {
  to { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-accent-line { animation: none; width: 100%; }
}

.hero-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-muted);
  line-height: 1.5;
}

.hero-bio {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 480px;
}

.hero-ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.btn-primary {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #0a0a0a;
  background: var(--accent);
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  transition: opacity 200ms ease, transform 200ms ease;
  animation: ctaPulse 2s ease-in-out infinite;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  animation: none;
}

@keyframes ctaPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(0, 255, 136, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary { animation: none; }
}

.btn-secondary {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-landing);
  background: transparent;
  border: 1px solid var(--border);
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 200ms ease, color 200ms ease, transform 200ms ease;
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}

/* CLI window — hardcoded dark, never inherits theme */
.cli-window {
  background: #111111;
  border: 1px solid #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
}

.cli-chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #1a1a1a;
  border-bottom: 1px solid #1e1e1e;
  user-select: none;
}

.cli-dots {
  display: flex;
  gap: 6px;
}

.cli-title-text {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 12px;
  color: #555;
  margin-left: 8px;
}

#terminal {
  height: 420px;
  overflow: hidden;
}

.cli-window .terminal-window {
  max-width: 100%;
  height: 100%;
  margin: 0;
  border: none;
  border-radius: 0;
}
```

### Experience CSS
```css
/* ── Experience timeline ────────────────────────────────── */
.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--border);
}

.timeline-entry {
  position: relative;
  margin-bottom: 48px;
}

.timeline-entry:last-child { margin-bottom: 0; }

.timeline-marker {
  position: absolute;
  left: -38px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid #0a0a0a;
  transform: scale(0);
  transition: transform 300ms ease-out;
}

.landing-page .timeline-entry.visible .timeline-marker {
  transform: scale(1);
}

.timeline-role {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-landing);
  margin-bottom: 4px;
}

.timeline-company {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.timeline-dates {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.timeline-desc {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 640px;
}
```

### Projects CSS
```css
/* ── Projects ───────────────────────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
}

.project-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.08);
}

.project-name {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-landing);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.project-badge {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10px;
  font-weight: 400;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 1px 6px;
  border-radius: 3px;
  opacity: 0.8;
}

.project-oneliner {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-links {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.project-link {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 12px;
  color: var(--accent);
  text-decoration: none;
  transition: opacity 150ms ease;
}

.project-link:hover { opacity: 0.7; }

.project-card:last-child:nth-child(odd) {
  grid-column: 1 / -1;
  max-width: 50%;
}
```

### Skills CSS
```css
/* ── Skills ─────────────────────────────────────────────── */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.skill-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skill-category {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

### Education CSS
```css
/* ── Education ──────────────────────────────────────────── */
.education-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.education-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.education-institution {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-landing);
  margin-bottom: 4px;
}

.education-degree {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.education-meta {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  color: var(--text-secondary);
}

.education-dates {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 12px;
  color: var(--text-secondary);
}

.education-gpa {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 13px;
  color: var(--accent);
  margin-top: 4px;
}

.education-awards,
.education-coursework {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.coursework-label {
  color: var(--text-landing);
  font-weight: 700;
}
```

### Footer CSS
```css
/* ── Footer / Contact ───────────────────────────────────── */
.footer {
  border-top: 1px solid var(--border);
  padding: 80px 0;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-heading {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: var(--text-landing);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
}

.footer-link {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 150ms ease;
}

.footer-link:hover { color: var(--accent); }

.footer-social {
  display: flex;
  align-items: center;
  gap: 6px;
}

.footer-resume {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
  border: 1px solid var(--accent);
  padding: 8px 16px;
  border-radius: 4px;
  width: fit-content;
  transition: background 150ms ease;
}

.footer-resume:hover { background: rgba(0, 255, 136, 0.08); }

.footer-copy {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 12px;
  color: var(--text-secondary);
  opacity: 0.5;
}
```

### Responsive CSS
```css
/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    padding-top: 24px;
  }

  .hero-headshot { width: 90px; height: 90px; }

  .hero-ctas { flex-direction: column; }

  .btn-primary, .btn-secondary { text-align: center; }

  #terminal { height: 320px; }

  .nav-links { gap: 16px; }
  .nav-links a { font-size: 12px; }

  .timeline::before { display: none; }
  .timeline { padding-left: 0; }
  .timeline-marker { display: none; }
  .timeline-entry {
    padding-bottom: 32px;
    border-bottom: 1px solid var(--border);
  }
  .timeline-entry:last-child { border-bottom: none; }

  .projects-grid { grid-template-columns: 1fr; }
  .project-card:last-child:nth-child(odd) { grid-column: auto; max-width: 100%; }

  .education-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .nav-links { display: none; }
  .section { padding: 80px 0; }
}
```

- [ ] Append all CSS blocks above to `src/style.css`
- [ ] Run `npm run dev`, verify all sections render and terminal works
- [ ] Commit: `git add src/style.css && git commit -m "feat: add complete landing page CSS — all sections and responsive"`

---

## Task 6: Create `src/landing.ts`

```typescript
// landing.ts — all non-terminal page behaviour
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
```

- [ ] Create `src/landing.ts` with the code above
- [ ] Run `npm run dev`, verify: navbar blurs on scroll, scroll reveals fire, smooth scroll works, terminal still boots
- [ ] Commit: `git add src/landing.ts && git commit -m "feat: add landing.ts — navbar scroll, scroll reveal with stagger, smooth scroll"`

---

## Task 7: Run `/impeccable craft`
- [ ] Run `/impeccable craft` — context: dark developer portfolio, terminal green accent, avoid AI slop aesthetics
- [ ] Apply suggestions to `index.html` / `src/style.css`
- [ ] Verify terminal still works
- [ ] Commit: `git add -A && git commit -m "chore: apply impeccable craft — visual quality pass"`

---

## Task 8: Run `/typeset`, `/colorize`, `/animate`, `/layout`
- [ ] `/typeset` → apply → `git commit -m "chore: apply typeset"`
- [ ] `/colorize` → apply → `git commit -m "chore: apply colorize"`
- [ ] `/animate` → apply → `git commit -m "chore: apply animate"`
- [ ] `/layout` → apply → `git commit -m "chore: apply layout"`

---

## Task 9: Run `/optimize` and `/polish`
- [ ] `/optimize` → apply → `git commit -m "chore: apply optimize"`
- [ ] `/polish` → apply → `git commit -m "chore: apply polish"`
- [ ] Final check: terminal works, all sections visible, scroll animations fire, responsive layout correct
