# Landing Page Design Spec
**Date:** 2026-04-11
**Project:** fayzanmalik portfolio
**Status:** Approved

---

## Overview

Transform the current CLI-only portfolio into a full, scrollable landing page with the CLI embedded as an interactive feature in the hero section. The site should feel like the work of a serious builder — polished, dark, technical — not a generic AI-generated portfolio.

Reference inspiration: https://www.itaisigler.com/

**Dark mode only.** No light mode toggle. The dark palette is the sole palette.

---

## Architecture

### Approach
Option A — Extend the existing Vite + TypeScript stack. No new frameworks or dependencies.

### File Changes

| File | Change |
|---|---|
| `index.html` | Rebuilt as full landing page; update Google Fonts link; `<div id="terminal">` is the CLI mount point |
| `src/main.ts` | **Untouched.** Uses `document.getElementById('terminal')` — `index.html` must provide a `<div id="terminal">` |
| `src/landing.ts` | NEW — see scope below |
| `src/style.css` | Extended — see CSS strategy below |
| `src/terminal.ts` | Untouched |
| `src/handlers.ts` | Untouched |
| `src/commands.ts` | Untouched |
| `src/data.ts` | Untouched |
| `src/autoplay.ts` | Untouched |
| `src/easter-eggs.ts` | Untouched |
| `public/headshot.png` | Already placed |
| `public/fayzan-resume.pdf` | Already present — linked as `/fayzan-resume.pdf` with `download` attribute |

### Terminal Mount Point
`main.ts` calls `document.getElementById('terminal')`. `index.html` must contain a `<div id="terminal">` inside the hero's right column. **No changes to `main.ts`.**

### `src/landing.ts` Scope (exclusive — no overlap with main.ts)
- Navbar: add/remove `.scrolled` class on `<nav>` when scroll > 60px
- Section reveals: `IntersectionObserver` on all elements with `[data-animate]` attribute; adds `.visible` class to trigger CSS transition
- Smooth anchor scroll for all `<a href="#...">` nav links
- No HTML rendering — all markup is static in `index.html`

### CSS Strategy
The existing `src/style.css` is extended, not replaced. Key conflicts resolved:

1. **`overflow: hidden` on `html, body`** — Remove this rule. The `#terminal` container gets its own `overflow: hidden` so the terminal does not overflow its fixed-height box.
2. **`--text: #e0e0e0`** — Keep existing value unchanged. Terminal components depend on it.
3. **`--text-muted: #888`** — Keep existing variable name and value. Terminal components depend on it.
4. **New variables added for landing page** (no collisions):
   - `--surface: #111111`
   - `--border: #1e1e1e`
   - `--accent: #00ff88`
   - `--text-landing: #ffffff` (used for large headings and CTAs; distinct from `--text` used by terminal)
5. Landing page CSS lives in a clearly commented block at the bottom of `style.css`, after all existing terminal styles.

---

## Visual Design System

### Color Tokens
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background (existing) |
| `--text` | `#e0e0e0` | Terminal text (existing, unchanged) |
| `--text-muted` | `#888` | Terminal muted text (existing, unchanged) |
| `--text-landing` | `#ffffff` | Landing page headings and CTAs |
| `--surface` | `#111111` | Cards, CLI container background |
| `--border` | `#1e1e1e` | Subtle separators and card borders |
| `--accent` | `#00ff88` | Primary accent (terminal green carried through) |

**Contrast verification required at implementation:**
- `--text (#e0e0e0)` on `--bg (#0a0a0a)`: ~14:1 ✓
- `--text-landing (#ffffff)` on `--bg (#0a0a0a)`: ~21:1 ✓
- `--text-muted (#888)` on `--bg (#0a0a0a)`: ~4.1:1 — borderline, lighten to `#999` if failing AA
- `--accent (#00ff88)` on `--bg (#0a0a0a)`: ~12:1 ✓

### Typography
| Role | Font | Weight |
|---|---|---|
| Headings | Inter | 700–800 |
| Body | Inter | 400 |
| Code / tags / dates / labels | JetBrains Mono | 400–500 |

**Google Fonts loading:** Replace the existing `<link>` in `index.html` with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
Fallback stack: Inter → `system-ui, sans-serif`; JetBrains Mono → `'Courier New', monospace`.

### Spacing
8px base unit. Section vertical padding: 120px. Card internal padding: 32px.

### Scroll Reveal Animation
```css
[data-animate] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}
[data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  [data-animate] { opacity: 1; transform: none; transition: none; }
}
```
`IntersectionObserver` threshold: 10%. Applied to: each `<section>`, each `.project-card`, each `.timeline-entry`.

---

## Page Sections

### 1. Navbar
```
<nav>
  <a class="nav-logo" href="#">Fayzan Malik</a>   ← JetBrains Mono
  <ul>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#education">Education</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```
- Fixed top, full width, `z-index: 100`
- Default: transparent background
- `.scrolled` state (added by `landing.ts` after 60px scroll): `background: rgba(10,10,10,0.85); backdrop-filter: blur(12px)`
- Transition: `background 200ms ease, backdrop-filter 200ms ease`

### 2. Hero
Full viewport height (`min-height: 100vh`). CSS Grid: `grid-template-columns: 1fr 1fr`, gap `64px`, `align-items: center`. Max-width container, centred.

**Left column (in order):**
1. Headshot: `<img src="/headshot.png" alt="Fayzan Malik" />` — 120px diameter, `border-radius: 50%`, `box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent)` (creates gap + accent ring)
2. `<h1>Fayzan Malik</h1>` — Inter 800, `--text-landing`
3. Title: `<p>Co-Founder & CTO, Chox AI · CS @ Western</p>` — Inter 400, `--text-muted`
4. Bio: `<p>` — text from `data.bio` (rendered as static text in HTML, matching data.ts value at build time)
5. CTAs:
   - Primary: `<a href="/fayzan-resume.pdf" download="fayzan-resume.pdf" class="btn-primary">Download Resume</a>`
   - Secondary: `<a href="#projects" class="btn-secondary">View Projects</a>`

**Right column:**
```html
<div class="cli-window">
  <div class="cli-chrome" aria-hidden="true">
    <span class="dot dot-red"></span>
    <span class="dot dot-yellow"></span>
    <span class="dot dot-green"></span>
    <span class="cli-title">fayzan@portfolio ~ %</span>
  </div>
  <div id="terminal"></div>
</div>
```
- `.cli-window`: `background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden`
- `#terminal`: `height: 420px; overflow: hidden` (terminal manages its own internal scroll)
- Dot colours: red `#ff5f57`, yellow `#ffbd2e`, green `#28c840`

**Responsive (≤ 768px):**
- `grid-template-columns: 1fr` — single column, left column first, right column below
- `#terminal` height: `320px`
- Headshot: `90px`
- CTAs: `flex-direction: column`

### 3. Experience
Section ID: `#experience`. Data source: `experience` array from `data.ts` (import in a `<script type="module">` or inline as static HTML matching current data).

Layout: vertical timeline. Left: `2px solid var(--border)` line. Each `.timeline-entry` is a node with:
- Small circle marker on the line (`--accent` fill)
- `role` — Inter 700, `--text-landing`
- `company` + `location` — Inter 400, `--text-muted`
- `dates` — JetBrains Mono, `--text-muted`
- `description` — rendered as `<p>`, full text, no truncation

Entry order (matching data.ts order): Co-Founder & CTO (Chox AI) → President & Founder (WAD Club) → Backend Dev Intern (ICARO) → Data Analyst Intern (Elite Life Financial).

Responsive (≤ 768px): timeline becomes simple stacked list, left border line removed.

### 4. Projects
Section ID: `#projects`. Data source: `projects` array from `data.ts`.

Layout: `display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px`.

**Card structure:**
- `name` — Inter 700
- `oneLiner` — Inter 400, `--text-muted`
- Stack tags: `stack` field split by `, ` — each tag is `<span class="tag">`, JetBrains Mono, `background: var(--surface)`, `border: 1px solid var(--border)`, padding `2px 8px`, `border-radius: 4px`. All tags shown, no truncation.
- Links: `github` always shown; `npm` and `live` shown only if the field exists on that project. All links: `target="_blank" rel="noopener noreferrer"`.

**Card hover:** `border-color: var(--accent)`, `transition: border-color 200ms ease`.

**Project order** (matching data.ts order — no `featured` field needed):
1. agency-agents, 2. claude-check, 3. thisthenthat, 4. ClearCare, 5. Chox AI, 6. Claude Skills, 7. Binary Tree, 8. Titanic

**Odd card (8 projects = even, no issue currently).** If count is ever odd: `.project-card:last-child:nth-child(odd) { grid-column: 1 / -1; max-width: 50%; }`.

Responsive (≤ 768px): `grid-template-columns: 1fr`.

### 5. Skills
Section ID: `#skills`. Data source: `skills` array from `data.ts` (`SkillCategory[]`).

Per category:
```html
<div class="skill-group">
  <h3 class="skill-category"><!-- category --></h3>  ← JetBrains Mono, --text-muted, uppercase, letter-spacing 0.08em
  <div class="skill-tags">
    <span class="tag"><!-- item --></span> ...        ← same .tag style as project stack tags
  </div>
</div>
```
Layout: `display: flex; flex-wrap: wrap; gap: 8px` for `.skill-tags`.

### 6. Education & Certifications
Section ID: `#education`. Data sources: `education` and `certification` from `data.ts`.

Desktop: `grid-template-columns: 1fr 1fr`, gap `48px`.

**Left — Education (`education` object):**
- `institution` — Inter 700
- `degree` — Inter 400
- `expected` — JetBrains Mono, `--text-muted`
- `gpa` — shown as `GPA: 3.8`
- `awards` — shown as a line of text
- `coursework` — shown as a line of text, prefixed `Coursework:`

**Right — Certification (`certification` object):**
- `name` — Inter 700
- `issuer` — Inter 400, `--text-muted`
- `date` — JetBrains Mono, `--text-muted`

Responsive (≤ 768px): `grid-template-columns: 1fr`, education first.

### 7. Footer / Contact
Section ID: `#contact`.

- Email: `<a href="mailto:fayzanm786@gmail.com">fayzanm786@gmail.com</a>` — from `contact.email`
- Phone: `<a href="tel:4372462116">437-246-2116</a>` — from `contact.phone` (intentionally public)
- Socials: GitHub, LinkedIn, Twitter — from `socials` array. SVG icons inline, links open in new tab.
- Resume: `<a href="/fayzan-resume.pdf" download="fayzan-resume.pdf">Download Resume</a>`
- Copyright: `© 2026 Fayzan Malik`

---

## Accessibility

- All `<img>` elements have descriptive `alt` attributes
- All interactive elements (`<a>`, `<button>`) are keyboard-navigable via tab
- Focus style: `outline: 2px solid var(--accent); outline-offset: 3px` on `:focus-visible` globally
- `<div id="terminal">` has `aria-label="Interactive terminal — type 'fayzan help' to get started"`
- `.cli-chrome` (traffic light dots + title bar) has `aria-hidden="true"`
- `prefers-reduced-motion: reduce` disables all `[data-animate]` transitions (see CSS above)
- Colour contrast verified at implementation time (see contrast notes in design system)

---

## Impeccable Skills Pipeline

All frontend implementation and refinement uses the **impeccable plugin** (https://impeccable.style/skills/) — **not** the built-in `frontend-design` skill, which produces generic AI aesthetics.

| Order | Skill | Purpose | Why this order |
|---|---|---|---|
| 1 | `/impeccable teach` | Establish design context and aesthetic before any code | Must run first — teaches the AI the project's visual language |
| 2 | `/shape` | Structure the layout skeleton and spatial system | Skeleton before visual details; catching structural issues early is cheap |
| 3 | `/impeccable craft` | Primary HTML/CSS implementation of all sections | Core build step; all sections implemented here |
| 4 | `/typeset` | Refine type hierarchy | Run after structure exists so type decisions are in context |
| 5 | `/colorize` | Lock in the color system | After layout/type so color doesn't mask structural problems |
| 6 | `/animate` | Scroll animations and micro-interactions | Motion added after static design is solid — avoids animating broken layouts |
| 7 | `/layout` | Spatial rhythm and alignment pass | Final structural check after all visual layers exist |
| 8 | `/optimize` | Performance — images, CSS, render blocking, CLS | Pre-ship; run after design is finalized so no late changes undo optimizations |
| 9 | `/polish` | Final quality pass | Last eyes before shipping |

---

## Constraints & Decisions

- **No new framework dependencies** — pure TypeScript + CSS + Vite
- **`main.ts` untouched** — terminal ID stays `#terminal`; `index.html` must provide `<div id="terminal">`
- **Terminal files all untouched** — terminal.ts, handlers.ts, commands.ts, autoplay.ts, easter-eggs.ts unchanged
- **`data.ts` untouched** — all content sourced from existing exports; HTML is static matching data at build time
- **Dark mode only** — no light mode toggle
- **CSS variable strategy** — existing `--text` and `--text-muted` preserved; new variables added without collision
- **`overflow: hidden` on body removed** — `#terminal` container gets its own `overflow: hidden`
- **Fonts** — Google Fonts CDN, Inter (400,700,800) + JetBrains Mono (400,500), `font-display: swap`
- **Phone number** — intentionally rendered in footer
- **OG meta tags** — out of scope for this spec
- **Impeccable skills mandatory** — no built-in `frontend-design` skill used at any point
