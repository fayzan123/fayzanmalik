# Landing Page Design Spec
**Date:** 2026-04-11
**Project:** fayzanmalik portfolio
**Status:** Approved

---

## Overview

Transform the current CLI-only portfolio into a full, scrollable landing page with the CLI embedded as an interactive feature in the hero section. The site should feel like the work of a serious builder — polished, dark, technical — not a generic AI-generated portfolio.

Reference inspiration: https://www.itaisigler.com/

---

## Architecture

### Approach
Option A — Extend the existing Vite + TypeScript stack. No new frameworks or dependencies.

### File Changes

| File | Change |
|---|---|
| `index.html` | Rebuilt as full landing page with all sections |
| `src/main.ts` | One change: mount terminal into `#cli-container` div instead of body |
| `src/landing.ts` | NEW — initialises scroll effects, navbar behaviour, section animations |
| `src/style.css` | Extended with landing page styles; existing terminal styles preserved intact |
| `src/terminal.ts` | Untouched |
| `src/handlers.ts` | Untouched |
| `src/commands.ts` | Untouched |
| `src/data.ts` | Untouched |
| `src/autoplay.ts` | Untouched |
| `src/easter-eggs.ts` | Untouched |
| `public/headshot.png` | Already placed by user |
| `public/fayzan-resume.pdf` | Already present |

The terminal mounts via:
```ts
terminal.mount(document.querySelector('#cli-container'))
```

---

## Visual Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--surface` | `#111111` | Cards, CLI container |
| `--border` | `#1e1e1e` | Subtle separators |
| `--accent` | `#00ff88` | Primary accent (terminal green) |
| `--text` | `#ffffff` | Primary text |
| `--muted` | `#666666` | Secondary text, dates |

### Typography
| Role | Font | Weight |
|---|---|---|
| Headings | Inter or DM Sans | 700–800 |
| Body | Inter | 400 |
| Code / tags / dates | JetBrains Mono | 400–500 |

JetBrains Mono is already used in the terminal — carrying it through as an accent typeface for skill tags, section labels, and dates creates visual cohesion between the CLI and the rest of the page.

### Spacing
8px base unit. Section vertical padding: 120px. Card internal padding: 32px.

### Motion
Subtle scroll-triggered fade-ins (`opacity` + slight `translateY`). No flashy animations. Refined by `/animate` impeccable skill post-build.

---

## Page Sections

### 1. Navbar
- Fixed top position
- Left: `Fayzan Malik` in monospace font
- Right: nav links — Experience, Projects, Skills, Education, Contact
- Backdrop blur on scroll

### 2. Hero (full viewport height, two-column)
**Left column:**
- Headshot (circular crop, subtle `--accent` ring)
- Name (`h1`)
- Title: `Co-Founder & CTO, Chox AI · CS @ Western`
- 2-line bio
- Two CTAs: `Download Resume` (primary) + `View Projects` (secondary)

**Right column:**
- The existing CLI terminal, visually unchanged
- Wrapped in a macOS-style window frame (three dot buttons: red/yellow/green)
- Container div: `#cli-container`

### 3. Experience
- Vertical timeline layout
- Each entry: role, company, dates, bullet descriptions
- Order: Co-Founder & CTO (Chox AI) → President & Founder (WAD Club) → Backend Dev Intern (ICARO) → Data Analyst Intern (Elite Life Financial)

### 4. Projects
- 2-column card grid
- Each card: project name, one-liner, stack tags (JetBrains Mono pills), GitHub link
- Featured projects (Chox AI, ClearCare, claude-check) get slightly elevated treatment

### 5. Skills
- Category labels in monospace
- Skills rendered as clean pill tags, grouped by category

### 6. Education & Certifications
- Two-column layout: degree (left), certification (right)
- Includes GPA, awards, coursework

### 7. Footer / Contact
- Email, phone, socials (GitHub, LinkedIn, Twitter)
- Resume download link
- Copyright line

---

## Impeccable Skills Pipeline

All frontend implementation and refinement uses the impeccable plugin (https://impeccable.style/skills/) — **not** the built-in `frontend-design` skill, which produces generic AI aesthetics.

| Order | Skill | Purpose |
|---|---|---|
| 1 | `/impeccable teach` | Establish design context and aesthetic before any code is written |
| 2 | `/shape` | Structure fundamental layout and spatial system |
| 3 | `/impeccable craft` | Primary HTML/CSS implementation of all new sections |
| 4 | `/typeset` | Refine type hierarchy across the page |
| 5 | `/colorize` | Lock in the color system |
| 6 | `/animate` | Add scroll animations and micro-interactions |
| 7 | `/layout` | Spatial rhythm and alignment pass |
| 8 | `/optimize` | Performance — images, CSS, render blocking |
| 9 | `/polish` | Final pre-ship quality pass |

---

## Constraints & Decisions

- **No new framework dependencies** — pure TypeScript + CSS + Vite
- **CLI is untouched** — terminal.ts, handlers.ts, commands.ts, data.ts all remain unchanged
- **Headshot** — `public/headshot.png`, circular crop with accent ring
- **Resume PDF** — `public/fayzan-resume.pdf`, already present
- **Impeccable skills are mandatory** — every visual refinement step goes through the impeccable pipeline above
