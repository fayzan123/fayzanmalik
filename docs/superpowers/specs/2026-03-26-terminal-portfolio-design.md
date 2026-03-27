# Fayzan Portfolio — Terminal-Style Website Design Spec

## Overview

A fully terminal-emulated portfolio website. No traditional UI — the terminal IS the site. Accessible to both developers (who type commands) and non-technical visitors (who use navigation chips). Static site, no backend.

## Tech Stack

- **Build tool:** Vite
- **Language:** Vanilla TypeScript (no framework)
- **Styling:** Single CSS file
- **Font:** JetBrains Mono via Google Fonts
- **Deployment:** Static output (HTML/CSS/JS) — compatible with Vercel, Netlify, GitHub Pages

## Project Structure

```
fayzan-portfolio/
├── public/
│   └── fayzan-resume.pdf        # User-provided resume PDF
├── src/
│   ├── main.ts                  # Entry point — boots terminal, runs autoplay
│   ├── terminal.ts              # Terminal engine — input, output, scrolling
│   ├── commands.ts              # Command registry — parses input, routes to handlers
│   ├── handlers.ts              # Handler functions — format output from data
│   ├── data.ts                  # All portfolio content as structured typed data
│   ├── autoplay.ts              # Install animation sequence
│   ├── easter-eggs.ts           # sudo hire fayzan, confetti, fun stuff
│   └── style.css                # All styles
├── index.html                   # Single HTML file with terminal container
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Architecture

### Terminal Engine (`terminal.ts`)

The core of the site. Owns the DOM and all I/O.

**Responsibilities:**
- Renders the terminal window: title bar (red/yellow/green dots, `fayzan@portfolio: ~`), scrollable output area, input line
- Captures keyboard input at cursor position
- On Enter: reads input, passes to command registry, appends command + output to scrollback
- Auto-scrolls to latest output
- Command history via up/down arrow keys
- Tab autocomplete: completes if unique match, shows options if multiple
- Exposes `print()` for appending output lines
- Exposes `printTyped()` for character-by-character typing simulation (used by autoplay)

**Input flow:**
```
Keypress → terminal captures it
  ├── Enter → extract input → commands.execute(input) → print output
  ├── Up/Down → cycle command history → update input display
  ├── Tab → autocomplete against command list → update input display
  └── Other → append character to input display
```

The terminal never knows what commands exist. It passes input to the command registry and prints whatever comes back.

### Command Registry (`commands.ts`)

- Maps command patterns to handler functions
- Parses raw input into: base command (`fayzan`/`f`), subcommand, arguments, flags
- Both `fayzan` and `f` resolve identically everywhere
- Special commands (`clear`, `history`, `sudo hire fayzan`) registered alongside normal ones
- Returns handler output string or friendly error message if no match

### Handlers (`handlers.ts`)

Each handler reads from `data.ts` and returns formatted terminal output as a string. No handler touches the DOM.

| Command | Behavior |
|---|---|
| `fayzan` (no args) | Returns bio text |
| `fayzan --help` | Returns help menu with all commands listed |
| `fayzan --version` | Returns `fayzan-portfolio v3.8.0` |
| `f projects` | Formatted table: name, stack, one-liner for all projects |
| `f projects <name>` | Deep-dive: description, stack, role, links. Friendly error if not found |
| `f experience` | Work experience, reverse chronological order |
| `f skills` | Skills grouped by category with visual treatment |
| `f education` | Education + certification |
| `f contact` | Email, phone, citizenship with clickable `mailto:`/`tel:` links |
| `f resume` | Print download message + trigger browser file download |
| `f socials` | GitHub/LinkedIn as clickable links |
| `clear` | Clears terminal output area |
| `history` | Numbered list of all commands typed this session |
| `sudo hire fayzan` | Fun message sequence + confetti overlay |

### Data Layer (`data.ts`)

Single file exporting typed objects. All portfolio content lives here — updating the portfolio means editing only this file.

**Exports:**
- `bio: string` — personal introduction
- `projects: Project[]` — all 6 projects with slug, name, oneLiner, description, stack, github, npm?, live?
- `experience: Experience[]` — 3 entries, reverse chronological
- `skills: SkillCategory[]` — 4 categories (Languages, Frameworks & Libraries, AI / LLM, Platforms & Tools)
- `education: { degree: Education, certification: Certification }`
- `contact: { email, phone, citizenship }`
- `socials: Social[]` — GitHub, LinkedIn
- `version: string` — `"fayzan-portfolio v3.8.0"`

Project slugs for `f projects <name>`: `claude-check`, `thisthenthat`, `agency-agents`, `clearcare`, `binary-tree`, `titanic`. Matching is case-insensitive.

### Autoplay Sequence (`autoplay.ts`)

Runs on page load before user gets control.

1. **Typing simulation** — `npm install fayzan-portfolio` typed character by character (~50-80ms per char, slight randomness)
2. **Enter fires** — blank line, install animation begins
3. **Install animation** (~3-4 seconds):
   - `Resolving dependencies...`
   - Progress bar filling incrementally: `[████████████████████████] 100%`
   - `added 1 package, audited 1 package in 2.4s`
   - `✓ fayzan-portfolio@1.0.0 installed successfully` (green)
   - `Type 'fayzan --help' to get started.`
4. **Handoff** — Input cursor activates, navigation chips fade in

**Skip mechanism:** Click or any keypress during autoplay → animation completes instantly, chips show immediately.

### Easter Eggs (`easter-eggs.ts`)

**`sudo hire fayzan`:**
1. Terminal prints (each line with slight delay):
   ```
   [sudo] password for recruiter: ********
   Verifying credentials...
   ✓ Permission granted.
   Sending offer letter to fayzanm786@gmail.com...
   ✓ Offer sent. Welcome aboard!
   ```
2. Confetti canvas overlay triggers on "Welcome aboard!" — runs ~3 seconds, fades out. Custom implementation, no external library.

**Edge cases:**
- `sudo <anything else>` → `Nice try. But the only command I'll sudo is 'sudo hire fayzan'.`
- Second run of `sudo hire fayzan` → `You already sent the offer! Check your inbox.`

## Navigation Chips

**Chips (6 total):** `help` · `projects` · `experience` · `skills` · `contact` · `resume`

**Placement:** Pinned inside the terminal chrome, below the scrollable output area, above the terminal's bottom border.

**Behavior:**
- Click writes full command to input line (e.g., `fayzan projects`), then executes — identical to typing
- Command appears in scrollback so user sees what happened
- Added to command history (arrow keys can recall)
- Always visible during interactive phase, hidden during autoplay, fade in on handoff

**Styling:**
- JetBrains Mono, muted border/outline style (not filled)
- Subtle hover: light background fill or border brightness
- Active/pressed: brief highlight

## Visual Design

### Color Scheme (Monochrome-Forward)

- **Background:** near-black (`#0a0a0a` or similar)
- **Primary text:** white/light gray
- **Input/commands:** white
- **Success messages / checkmarks:** green (muted, not neon)
- **Errors:** red/orange
- **Links:** subtle cyan, underlined
- **Progress bar / accents:** green

### Terminal Chrome

- Title bar with red/yellow/green dots (decorative)
- Title text: `fayzan@portfolio: ~`
- Prompt prefix: `$ ` before each input line

### Typography

- JetBrains Mono everywhere, no exceptions
- Loaded via Google Fonts

## Responsive Design

**Desktop (>640px):**
- Terminal floats centered in viewport with padding
- Max-width ~900px
- All features work via keyboard

**Mobile (≤640px):**
- Terminal fills full viewport, no floating window effect
- Chips: slightly taller, more spacing, horizontally scrollable if overflow
- Input line functional (brings up phone keyboard)
- Title bar dots decorative only (no hover states)

**No orientation lock.** Works in portrait and landscape.

## Error Handling

All unrecognized input returns a warm, helpful message:
- `Hmm, I don't know that one. Try 'fayzan --help' to see what I can do, or use the buttons below.`
- `Not sure what '<input>' means — type 'fayzan --help' for a list of commands, or just tap one of the options below.`

Never jargon. Never condescending. Always redirect to `--help` or chips.

## Content Source

All real data is specified in the original spec (`fayzan-portfolio-spec (1).md`). The `data.ts` file will contain this content exactly as written — bio, 6 projects, 3 experience entries, 4 skill categories, education + certification, contact info, 2 social profiles, and the version string `fayzan-portfolio v3.8.0`.

## Deployment

Static output via `vite build`. No server-side requirements. Output is HTML + CSS + JS + resume PDF. Compatible with Vercel, Netlify, GitHub Pages, or any static host.
