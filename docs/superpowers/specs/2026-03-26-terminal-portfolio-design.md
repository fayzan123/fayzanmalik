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
| `fayzan --help` | Returns the exact help output below |
| `fayzan --version` | Returns `fayzan-portfolio v3.8.0` |
| `f projects` | Formatted table: name, stack, one-liner for all projects |
| `f projects <name>` | Deep-dive: description, stack, role, links. Friendly error if not found |
| `f experience` | Work experience, reverse chronological order |
| `f skills` | Skills grouped by category with visual treatment |
| `f education` | Education + certification |
| `f contact` | Email, phone, citizenship with clickable `mailto:`/`tel:` links. **Design decision:** Citizenship placed here (rather than bio) because recruiters checking contact info are the ones evaluating work eligibility. |
| `f resume` | Print download message + trigger browser file download |
| `f socials` | GitHub/LinkedIn as clickable links |
| `clear` | Clears terminal output area |
| `history` | Numbered list of all commands typed this session |
| `sudo hire fayzan` | Fun message sequence + confetti overlay |

### Data Layer (`data.ts`)

Single file exporting typed objects. All portfolio content lives here — updating the portfolio means editing only this file.

**Exports:**
- `bio: string` — personal introduction
- `projects: Project[]` — all 6 projects with slug, name, oneLiner, description, stack, role, github, npm?, live?
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

### Verbatim `--help` Output

```
Usage: fayzan <command> [options]

Commands:
  projects      See what I've built
  experience    Where I've worked
  skills        What I work with
  education     Where I studied
  contact       Get in touch with me
  resume        Download my resume
  socials       Find me online

Options:
  --help        Show this help message
  --version     Show version info

Run 'fayzan <command>' to explore. Or just click a button below.
```

The last line explicitly references the navigation chips — critical for non-technical visitors.

### Command Accessibility Matrix

| Command | Chip | Type-only | Notes |
|---|---|---|---|
| `fayzan --help` | `help` chip | Also typeable | Primary onboarding command |
| `f projects` | `projects` chip | Also typeable | |
| `f experience` | `experience` chip | Also typeable | |
| `f skills` | `skills` chip | Also typeable | |
| `f contact` | `contact` chip | Also typeable | |
| `f resume` | `resume` chip | Also typeable | |
| `f education` | No chip | Type only | Discoverable via `--help` |
| `f socials` | No chip | Type only | Discoverable via `--help` |
| `fayzan` (no args) | No chip | Type only | |
| `fayzan --version` | No chip | Type only | |
| `clear` | No chip | Type only | Standard terminal command |
| `history` | No chip | Type only | Standard terminal command |
| `sudo hire fayzan` | No chip | Type only | Easter egg — not advertised |

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

## Content (Verbatim — Use Exactly As Written)

All content below goes into `data.ts`. This is the single source of truth for implementation.

### Bio

"Hey, I'm Fayzan — a Computer Science student at Western University, full stack developer, and builder. I'm into AI agents, CLI tools, and shipping things that actually work. Currently leading Western's Agentic Development Club and always working on something — whether it's a side project or something more serious."

### Projects

1. **claude-check** — slug: `claude-check`
   - One-liner: A CLI tool that scores your prompt before you send it to Claude.
   - Description: An npm CLI that analyses any Claude prompt for complexity, estimates how many messages it'll take, assesses interrupt risk, and returns a safe/caution/do-not-start verdict. It checks your real-time claude.ai usage so you don't burn your limit on a task that'll get cut off halfway. Built and published to npm.
   - Stack: Node.js, TypeScript, Anthropic API, CLI Tooling
   - Role: Solo developer
   - GitHub: https://github.com/fayzan123/claude-check
   - npm: https://www.npmjs.com/package/claude-check
   - Live: N/A

2. **ThisThenThat** — slug: `thisthenthat`
   - One-liner: Upload your assignment PDF and get a step-by-step game plan with AI chat per step.
   - Description: A web app that takes a PDF of a school or university assignment and breaks it down into an ordered checklist of actionable steps. Each step has its own AI chat that knows the full assignment context, so you can get unstuck on any specific part without re-explaining everything.
   - Stack: Next.js, TypeScript, Supabase, Tailwind, Claude API
   - Role: Solo developer
   - GitHub: https://github.com/fayzan123/thisthenthat
   - Live: https://thisthenthat.vercel.app

3. **agency-agents (Open Source Contribution)** — slug: `agency-agents`
   - One-liner: Merged a LinkedIn Content Creator agent into the #1 trending GitHub repo.
   - Description: Contributed a LinkedIn Content Creator agent to the agency-agents repository (PR #129), which was the #1 trending repo on GitHub at the time with 30,000+ stars. The agent handles LinkedIn thought leadership content strategy, post drafting, and audience engagement workflows.
   - Stack: Bash, Claude, GitHub
   - Role: Open source contributor
   - GitHub: https://github.com/msitarzewski/agency-agents
   - Live: N/A

4. **ClearCare** — slug: `clearcare`
   - One-liner: A rural healthcare referral platform with AI voice follow-ups and SMS alerts.
   - Description: A closed-loop referral management platform built for rural patients who are 110+ km from specialist care. Features AI-powered voice follow-up calls via Vapi, SMS alerts via Twilio, and escalation workflows to keep patients from falling through the cracks.
   - Stack: React, TypeScript, FastAPI, PostgreSQL, Vapi, Twilio
   - Role: Team member
   - GitHub: https://github.com/Deogan7/ClearCare
   - Live: N/A

5. **Binary Tree Traversal Practice Tool** — slug: `binary-tree`
   - One-liner: A gamified platform for practicing binary tree traversals with real-time visual feedback.
   - Description: A React-based educational tool that helps students practice preorder, inorder, and postorder binary tree traversals. Features randomly generated trees, real-time visual feedback, and has been used by 100+ students.
   - Stack: React, JavaScript, Firebase, Gemini, OpenAI
   - Role: Solo developer
   - GitHub: https://github.com/fayzan123/binary_iterating_practice
   - Live: N/A

6. **Titanic Survival Prediction** — slug: `titanic`
   - One-liner: ML model comparison for Titanic survival classification.
   - Description: Engineered features with Pandas and trained Decision Tree, XGBoost, and TensorFlow neural network models to predict Titanic survival. Compared accuracy metrics across all three approaches.
   - Stack: Python, Jupyter Notebook, Pandas, Scikit-learn, TensorFlow, Seaborn, Matplotlib
   - Role: Solo developer
   - GitHub: https://github.com/fayzan123/Titanic-Survival-Prediction
   - Live: N/A

### Experience (reverse chronological)

1. **President & Founder** — Western Agentic Development Club, Western University (London, ON) — March 2026 – Present
   - Founded and currently lead a student-run agentic AI community for computer science students at Western University. Organize workshops, hackathons, and networking events on autonomous agent development using n8n, LangGraph, and MCP-based workflows. Oversee club-led projects where members collaborate across teams to build and ship practical AI agent solutions.

2. **Backend Development Intern** — ICARO Media Group (Thornhill, ON) — July 2025 – September 2025
   - Refactored and upgraded LAMP-based web applications, reducing production friction across internal workflows. Standardized AWS EC2 development environments for 5+ developers, improving release reliability and test consistency. Built Flask REST APIs and resolved latency bottlenecks via profiling, improving median API response time by 15% under peak load.

3. **Data Analyst Intern** — Elite Life Financial (Toronto, ON) — June 2024 – September 2024
   - Analyzed 500+ client records with SQL and Python, improving recommendation logic and advisor-client personalization. Automated repetitive workflows with optimized SQL queries and scripts, reducing manual processing time by 30%.

### Skills

- **Languages:** Python, Java, C, SQL (MySQL), JavaScript, TypeScript, HTML/CSS, R, Go
- **Frameworks & Libraries:** React, Flask, Next.js, Tailwind CSS, NumPy, Pandas, Matplotlib, TensorFlow, Scikit-learn, PyTorch, Seaborn
- **AI / LLM:** OpenAI, Claude, Gemini, LangGraph, CrewAI, AutoGen, MCP
- **Platforms & Tools:** Git, Linux, Docker, AWS, Supabase, Firebase, Postman, VS Code, Jupyter, IntelliJ, PyCharm

### Education

- **Honours Specialization in Computer Science (HBSc)** — Western University (London, ON) — Expected May 2027
  - GPA: 3.8
  - Awards: Western Admission Scholarship; Dean's Honor List 2023, 2024
  - Relevant Coursework: Data Structures and Algorithms, Machine Learning, Databases, Statistics, Operating Systems, Software Engineering

- **Certification:** Machine Learning Specialization by Andrew Ng — Coursera, DeepLearning.AI — December 2025

### Contact

- Email: fayzanm786@gmail.com
- Phone: 437-246-2116
- Citizenship: Canadian Citizen

### Socials

- GitHub: https://github.com/fayzan123
- LinkedIn: https://linkedin.com/in/fayzan-malik

### Version

`fayzan-portfolio v3.8.0` (a nod to Fayzan's 3.8 GPA)

## Deployment

Static output via `vite build`. No server-side requirements. Output is HTML + CSS + JS + resume PDF. Compatible with Vercel, Netlify, GitHub Pages, or any static host.
