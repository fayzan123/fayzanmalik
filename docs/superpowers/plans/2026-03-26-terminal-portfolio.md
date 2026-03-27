# Terminal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully terminal-emulated portfolio website that's accessible to both developers and non-technical visitors.

**Architecture:** Single-page static site built with Vite + vanilla TypeScript. A terminal engine handles all DOM I/O. A command registry routes parsed input to handler functions that read from a centralized data file and return formatted strings. Navigation chips provide click-based navigation for non-technical visitors.

**Tech Stack:** Vite, TypeScript, CSS, JetBrains Mono (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-03-26-terminal-portfolio-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Shell HTML — loads font, contains `#terminal` container div |
| `src/style.css` | All styles: terminal chrome, colors, chips, responsive, animations |
| `src/data.ts` | All portfolio content as typed exports. Only file to edit for content updates |
| `src/terminal.ts` | Terminal engine: DOM rendering, input capture, output, scrolling, history, autocomplete |
| `src/commands.ts` | Command registry: parses input, routes to handlers, returns output or error |
| `src/handlers.ts` | Handler functions: read data, return formatted terminal output strings |
| `src/autoplay.ts` | Install animation: typing sim, progress bar, handoff to interactive mode |
| `src/easter-eggs.ts` | `sudo hire fayzan` handler + confetti canvas overlay |
| `src/main.ts` | Entry point: creates terminal, registers commands, runs autoplay |
| `package.json` | Dependencies (vite, typescript only) and scripts |
| `tsconfig.json` | TypeScript config targeting ES2020, strict mode |
| `vite.config.ts` | Vite config (minimal — defaults are fine) |
| `public/fayzan-resume.pdf` | User-provided resume file (placeholder until user adds it) |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/style.css`

- [ ] **Step 1: Initialize project with package.json**

```json
{
  "name": "fayzan-portfolio",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install --save-dev vite typescript`
Expected: `node_modules` created, `package-lock.json` generated

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite';

export default defineConfig({});
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fayzan Malik — Portfolio</title>
  <meta name="description" content="Fayzan Malik — Computer Science student, full stack developer, builder." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/src/style.css" />
</head>
<body>
  <div id="terminal"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

- [ ] **Step 6: Create minimal src/style.css**

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg: #0a0a0a;
  --text: #e0e0e0;
  --text-muted: #888;
  --green: #4ec970;
  --red: #e06c75;
  --cyan: #56b6c2;
  --title-bar: #1a1a1a;
  --chip-border: #444;
  --chip-hover: #222;
}

html, body {
  height: 100%;
  background: var(--bg);
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--text);
  overflow: hidden;
}
```

- [ ] **Step 7: Create minimal src/main.ts**

```typescript
import './style.css';

console.log('fayzan-portfolio loaded');
```

- [ ] **Step 8: Verify dev server starts**

Run: `npm run dev`
Expected: Vite dev server starts, browser shows blank dark page with console message

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts index.html src/main.ts src/style.css .gitignore
git commit -m "feat: scaffold Vite + TypeScript project"
```

Note: Create `.gitignore` before committing:

```
node_modules/
dist/
```

---

### Task 2: Data Layer

**Files:**
- Create: `src/data.ts`

- [ ] **Step 1: Define TypeScript types and export all portfolio data**

```typescript
export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  stack: string;
  role: string;
  github: string;
  npm?: string;
  live?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  dates: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  expected: string;
  gpa: string;
  awards: string;
  coursework: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Social {
  platform: string;
  url: string;
}

export const bio = "Hey, I'm Fayzan \u2014 a Computer Science student at Western University, full stack developer, and builder. I'm into AI agents, CLI tools, and shipping things that actually work. Currently leading Western's Agentic Development Club and always working on something \u2014 whether it's a side project or something more serious.";

export const projects: Project[] = [
  {
    slug: 'claude-check',
    name: 'claude-check',
    oneLiner: 'A CLI tool that scores your prompt before you send it to Claude.',
    description: "An npm CLI that analyses any Claude prompt for complexity, estimates how many messages it'll take, assesses interrupt risk, and returns a safe/caution/do-not-start verdict. It checks your real-time claude.ai usage so you don't burn your limit on a task that'll get cut off halfway. Built and published to npm.",
    stack: 'Node.js, TypeScript, Anthropic API, CLI Tooling',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/claude-check',
    npm: 'https://www.npmjs.com/package/claude-check',
  },
  {
    slug: 'thisthenthat',
    name: 'ThisThenThat',
    oneLiner: 'Upload your assignment PDF and get a step-by-step game plan with AI chat per step.',
    description: 'A web app that takes a PDF of a school or university assignment and breaks it down into an ordered checklist of actionable steps. Each step has its own AI chat that knows the full assignment context, so you can get unstuck on any specific part without re-explaining everything.',
    stack: 'Next.js, TypeScript, Supabase, Tailwind, Claude API',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/thisthenthat',
    live: 'https://thisthenthat.vercel.app',
  },
  {
    slug: 'agency-agents',
    name: 'agency-agents (Open Source Contribution)',
    oneLiner: 'Merged a LinkedIn Content Creator agent into the #1 trending GitHub repo.',
    description: 'Contributed a LinkedIn Content Creator agent to the agency-agents repository (PR #129), which was the #1 trending repo on GitHub at the time with 30,000+ stars. The agent handles LinkedIn thought leadership content strategy, post drafting, and audience engagement workflows.',
    stack: 'Bash, Claude, GitHub',
    role: 'Open source contributor',
    github: 'https://github.com/msitarzewski/agency-agents',
  },
  {
    slug: 'clearcare',
    name: 'ClearCare',
    oneLiner: 'A rural healthcare referral platform with AI voice follow-ups and SMS alerts.',
    description: 'A closed-loop referral management platform built for rural patients who are 110+ km from specialist care. Features AI-powered voice follow-up calls via Vapi, SMS alerts via Twilio, and escalation workflows to keep patients from falling through the cracks.',
    stack: 'React, TypeScript, FastAPI, PostgreSQL, Vapi, Twilio',
    role: 'Team member',
    github: 'https://github.com/Deogan7/ClearCare',
  },
  {
    slug: 'binary-tree',
    name: 'Binary Tree Traversal Practice Tool',
    oneLiner: 'A gamified platform for practicing binary tree traversals with real-time visual feedback.',
    description: 'A React-based educational tool that helps students practice preorder, inorder, and postorder binary tree traversals. Features randomly generated trees, real-time visual feedback, and has been used by 100+ students.',
    stack: 'React, JavaScript, Firebase, Gemini, OpenAI',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/binary_iterating_practice',
  },
  {
    slug: 'titanic',
    name: 'Titanic Survival Prediction',
    oneLiner: 'ML model comparison for Titanic survival classification.',
    description: 'Engineered features with Pandas and trained Decision Tree, XGBoost, and TensorFlow neural network models to predict Titanic survival. Compared accuracy metrics across all three approaches.',
    stack: 'Python, Jupyter Notebook, Pandas, Scikit-learn, TensorFlow, Seaborn, Matplotlib',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/Titanic-Survival-Prediction',
  },
];

export const experience: Experience[] = [
  {
    role: 'President & Founder',
    company: 'Western Agentic Development Club, Western University',
    location: 'London, ON',
    dates: 'March 2026 \u2013 Present',
    description: 'Founded and currently lead a student-run agentic AI community for computer science students at Western University. Organize workshops, hackathons, and networking events on autonomous agent development using n8n, LangGraph, and MCP-based workflows. Oversee club-led projects where members collaborate across teams to build and ship practical AI agent solutions.',
  },
  {
    role: 'Backend Development Intern',
    company: 'ICARO Media Group',
    location: 'Thornhill, ON',
    dates: 'July 2025 \u2013 September 2025',
    description: 'Refactored and upgraded LAMP-based web applications, reducing production friction across internal workflows. Standardized AWS EC2 development environments for 5+ developers, improving release reliability and test consistency. Built Flask REST APIs and resolved latency bottlenecks via profiling, improving median API response time by 15% under peak load.',
  },
  {
    role: 'Data Analyst Intern',
    company: 'Elite Life Financial',
    location: 'Toronto, ON',
    dates: 'June 2024 \u2013 September 2024',
    description: 'Analyzed 500+ client records with SQL and Python, improving recommendation logic and advisor-client personalization. Automated repetitive workflows with optimized SQL queries and scripts, reducing manual processing time by 30%.',
  },
];

export const skills: SkillCategory[] = [
  { category: 'Languages', items: ['Python', 'Java', 'C', 'SQL (MySQL)', 'JavaScript', 'TypeScript', 'HTML/CSS', 'R', 'Go'] },
  { category: 'Frameworks & Libraries', items: ['React', 'Flask', 'Next.js', 'Tailwind CSS', 'NumPy', 'Pandas', 'Matplotlib', 'TensorFlow', 'Scikit-learn', 'PyTorch', 'Seaborn'] },
  { category: 'AI / LLM', items: ['OpenAI', 'Claude', 'Gemini', 'LangGraph', 'CrewAI', 'AutoGen', 'MCP'] },
  { category: 'Platforms & Tools', items: ['Git', 'Linux', 'Docker', 'AWS', 'Supabase', 'Firebase', 'Postman', 'VS Code', 'Jupyter', 'IntelliJ', 'PyCharm'] },
];

export const education: Education = {
  degree: 'Honours Specialization in Computer Science (HBSc)',
  institution: 'Western University',
  location: 'London, ON',
  expected: 'May 2027',
  gpa: '3.8',
  awards: 'Western Admission Scholarship; Dean\u2019s Honor List 2023, 2024',
  coursework: 'Data Structures and Algorithms, Machine Learning, Databases, Statistics, Operating Systems, Software Engineering',
};

export const certification: Certification = {
  name: 'Machine Learning Specialization by Andrew Ng',
  issuer: 'Coursera, DeepLearning.AI',
  date: 'December 2025',
};

export const contact = {
  email: 'fayzanm786@gmail.com',
  phone: '437-246-2116',
  citizenship: 'Canadian Citizen',
};

export const socials: Social[] = [
  { platform: 'GitHub', url: 'https://github.com/fayzan123' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/fayzan-malik' },
];

export const version = 'fayzan-portfolio v3.8.0';
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/data.ts
git commit -m "feat: add portfolio data layer with all content"
```

---

### Task 3: Terminal Engine — DOM Structure & Output

**Files:**
- Create: `src/terminal.ts`
- Modify: `src/style.css`
- Modify: `src/main.ts`

- [ ] **Step 1: Create terminal.ts with DOM rendering and print methods**

The Terminal class creates and manages the full terminal DOM structure:
- Outer container: `.terminal-window`
- Title bar: `.title-bar` with three colored dots and `fayzan@portfolio: ~` text
- Output area: `.terminal-output` (scrollable div that holds all printed lines)
- Input line: `.input-line` with prompt `$ ` and an editable span for user input
- Chips container: `.chips` (hidden initially)

Public API:
- `constructor(container: HTMLElement)` — builds DOM, attaches to container
- `print(html: string)` — appends a line div to the output area, auto-scrolls
- `printTyped(text: string, speed?: number): Promise<void>` — types text character by character into a new line, resolves when done
- `getInput(): string` — reads current input value
- `setInput(text: string)` — sets the input display
- `clearInput()` — empties the input
- `clearOutput()` — removes all children from output area
- `focus()` — focuses the input element
- `setInteractive(enabled: boolean)` — shows/hides input line and chips
- `onSubmit(callback: (input: string) => void)` — registers the Enter key handler
- `showChips()` — fades in the navigation chips

Internal state:
- `commandHistory: string[]` — stores all submitted commands
- `historyIndex: number` — current position when cycling with arrow keys

```typescript
export class Terminal {
  private outputEl: HTMLElement;
  private inputEl: HTMLElement;
  private promptEl: HTMLElement;
  private chipsEl: HTMLElement;
  private commandHistory: string[] = [];
  private historyIndex = -1;
  private submitCallback: ((input: string) => void) | null = null;

  constructor(container: HTMLElement) {
    // Build DOM structure
    const window = document.createElement('div');
    window.className = 'terminal-window';

    // Title bar
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `
      <div class="title-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <span class="title-text">fayzan@portfolio: ~</span>
    `;
    window.appendChild(titleBar);

    // Output area
    this.outputEl = document.createElement('div');
    this.outputEl.className = 'terminal-output';
    window.appendChild(this.outputEl);

    // Input line
    this.promptEl = document.createElement('div');
    this.promptEl.className = 'input-line hidden';
    this.promptEl.innerHTML = '<span class="prompt">$ </span>';
    this.inputEl = document.createElement('span');
    this.inputEl.className = 'input-text';
    this.inputEl.setAttribute('contenteditable', 'true');
    this.inputEl.setAttribute('spellcheck', 'false');
    this.inputEl.setAttribute('autocapitalize', 'none');
    this.inputEl.setAttribute('autocomplete', 'off');
    this.inputEl.setAttribute('autocorrect', 'off');
    this.promptEl.appendChild(this.inputEl);
    window.appendChild(this.promptEl);

    // Navigation chips
    this.chipsEl = document.createElement('div');
    this.chipsEl.className = 'chips hidden';
    window.appendChild(this.chipsEl);

    container.appendChild(window);

    // Key event listeners attached in setInteractive
  }

  print(html: string): void {
    const line = document.createElement('div');
    line.className = 'output-line';
    line.innerHTML = html;
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  async printTyped(text: string, speed = 60): Promise<void> {
    const line = document.createElement('div');
    line.className = 'output-line';
    this.outputEl.appendChild(line);
    for (const char of text) {
      line.textContent += char;
      this.outputEl.scrollTop = this.outputEl.scrollHeight;
      await new Promise(r => setTimeout(r, speed + Math.random() * 30));
    }
  }

  getInput(): string {
    return this.inputEl.textContent?.trim() ?? '';
  }

  setInput(text: string): void {
    this.inputEl.textContent = text;
  }

  clearInput(): void {
    this.inputEl.textContent = '';
  }

  clearOutput(): void {
    this.outputEl.innerHTML = '';
  }

  focus(): void {
    this.inputEl.focus();
  }

  setInteractive(enabled: boolean): void {
    if (enabled) {
      this.promptEl.classList.remove('hidden');
      this.inputEl.focus();
      this.attachKeyListeners();
    } else {
      this.promptEl.classList.add('hidden');
    }
  }

  showChips(): void {
    this.chipsEl.classList.remove('hidden');
    this.chipsEl.classList.add('fade-in');
  }

  onSubmit(callback: (input: string) => void): void {
    this.submitCallback = callback;
  }

  addChip(label: string, command: string): void {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = label;
    chip.addEventListener('click', () => {
      this.executeCommand(command);
    });
    this.chipsEl.appendChild(chip);
  }

  getHistory(): string[] {
    return [...this.commandHistory];
  }

  private executeCommand(command: string): void {
    // Show the command as if typed
    this.print(`<span class="prompt">$ </span><span class="input-echo">${command}</span>`);
    this.commandHistory.push(command);
    this.historyIndex = -1;
    if (this.submitCallback) {
      this.submitCallback(command);
    }
  }

  private attachKeyListeners(): void {
    this.inputEl.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;

      if (ke.key === 'Enter') {
        ke.preventDefault();
        const input = this.getInput();
        if (!input) return;
        this.print(`<span class="prompt">$ </span><span class="input-echo">${input}</span>`);
        this.commandHistory.push(input);
        this.historyIndex = -1;
        this.clearInput();
        if (this.submitCallback) {
          this.submitCallback(input);
        }
      }

      if (ke.key === 'ArrowUp') {
        ke.preventDefault();
        if (this.commandHistory.length === 0) return;
        if (this.historyIndex === -1) {
          this.historyIndex = this.commandHistory.length - 1;
        } else if (this.historyIndex > 0) {
          this.historyIndex--;
        }
        this.setInput(this.commandHistory[this.historyIndex]);
      }

      if (ke.key === 'ArrowDown') {
        ke.preventDefault();
        if (this.historyIndex === -1) return;
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.setInput(this.commandHistory[this.historyIndex]);
        } else {
          this.historyIndex = -1;
          this.clearInput();
        }
      }

      if (ke.key === 'Tab') {
        ke.preventDefault();
        // Tab autocomplete — will be wired up in Task 5
      }
    });

    // Keep focus on input when clicking anywhere in the terminal
    document.querySelector('.terminal-window')?.addEventListener('click', () => {
      this.inputEl.focus();
    });
  }
}
```

- [ ] **Step 2: Add terminal styles to style.css**

Append to `src/style.css`:

```css
/* Terminal window */
.terminal-window {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  height: 100vh;
  margin: 0 auto;
  background: var(--bg);
  border: 1px solid #333;
  overflow: hidden;
}

@media (min-width: 641px) {
  .terminal-window {
    height: calc(100vh - 48px);
    margin: 24px auto;
    border-radius: 8px;
  }
}

/* Title bar */
.title-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--title-bar);
  border-bottom: 1px solid #333;
  user-select: none;
  flex-shrink: 0;
}

@media (min-width: 641px) {
  .title-bar {
    border-radius: 8px 8px 0 0;
  }
}

.title-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-red { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green { background: #28c840; }

.title-text {
  color: var(--text-muted);
  font-size: 13px;
  margin-left: 8px;
}

/* Output area */
.terminal-output {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
}

.output-line {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
  min-height: 1.6em;
}

/* Input line */
.input-line {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-top: 1px solid #222;
  flex-shrink: 0;
}

.prompt {
  color: var(--green);
  margin-right: 4px;
  user-select: none;
}

.input-text {
  flex: 1;
  outline: none;
  caret-color: var(--text);
  color: var(--text);
}

.input-echo {
  color: var(--text);
}

/* Navigation chips */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 16px;
  border-top: 1px solid #222;
  flex-shrink: 0;
}

.chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--chip-border);
  border-radius: 14px;
  padding: 4px 12px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.chip:hover {
  background: var(--chip-hover);
  border-color: var(--text-muted);
  color: var(--text);
}

.chip:active {
  background: #333;
}

@media (max-width: 640px) {
  .chips {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  .chip {
    font-size: 13px;
    padding: 6px 14px;
    flex-shrink: 0;
  }
}

/* Utilities */
.hidden {
  display: none !important;
}

.fade-in {
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Semantic colors for output */
.text-green { color: var(--green); }
.text-red { color: var(--red); }
.text-cyan { color: var(--cyan); }
.text-muted { color: var(--text-muted); }

a {
  color: var(--cyan);
  text-decoration: underline;
  text-underline-offset: 2px;
}

a:hover {
  color: var(--text);
}
```

- [ ] **Step 3: Update main.ts to instantiate the terminal**

```typescript
import './style.css';
import { Terminal } from './terminal';

const container = document.getElementById('terminal');
if (!container) throw new Error('Missing #terminal container');

const terminal = new Terminal(container);
terminal.print('Terminal loaded. Wiring up commands next...');
terminal.setInteractive(true);
```

- [ ] **Step 4: Verify terminal renders in browser**

Run: `npm run dev`
Expected: Dark page with terminal window — title bar with colored dots, "Terminal loaded..." text in output area, blinking cursor in input line. Typing text should work, Enter does nothing useful yet.

- [ ] **Step 5: Commit**

```bash
git add src/terminal.ts src/style.css src/main.ts
git commit -m "feat: add terminal engine with DOM rendering, input, and output"
```

---

### Task 4: Command Registry & Handlers

**Files:**
- Create: `src/commands.ts`
- Create: `src/handlers.ts`
- Modify: `src/main.ts`

- [ ] **Step 1: Create commands.ts — parser and registry**

```typescript
type CommandHandler = (args: string[], flags: string[]) => string | Promise<string>;

interface ParsedCommand {
  base: string;
  subcommand: string;
  args: string[];
  flags: string[];
}

const handlers = new Map<string, CommandHandler>();

export function register(command: string, handler: CommandHandler): void {
  handlers.set(command, handler);
}

export function getRegisteredCommands(): string[] {
  return Array.from(handlers.keys());
}

function parse(raw: string): ParsedCommand {
  const tokens = raw.trim().split(/\s+/);
  const base = tokens[0]?.toLowerCase() ?? '';
  const rest = tokens.slice(1);
  const flags = rest.filter(t => t.startsWith('--'));
  const args = rest.filter(t => !t.startsWith('--'));
  const subcommand = args.shift() ?? '';
  return { base, subcommand, args, flags };
}

export async function execute(raw: string): Promise<string> {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  // Special commands that match the full input string
  const fullMatch = handlers.get(trimmed.toLowerCase());
  if (fullMatch) return fullMatch([], []);

  const { base, subcommand, args, flags } = parse(trimmed);

  // Normalize "fayzan" and "f" to the same namespace
  if (base !== 'fayzan' && base !== 'f') {
    // Check for standalone commands (clear, history)
    const standalone = handlers.get(base);
    if (standalone) return standalone(args, flags);
    return errorMessage(trimmed);
  }

  // Handle flags on the base command
  if (flags.includes('--help') && !subcommand) {
    const helpHandler = handlers.get('help');
    if (helpHandler) return helpHandler([], []);
  }

  if (flags.includes('--version') && !subcommand) {
    const versionHandler = handlers.get('version');
    if (versionHandler) return versionHandler([], []);
  }

  // No subcommand and no flags = bio
  if (!subcommand && flags.length === 0) {
    const bioHandler = handlers.get('bio');
    if (bioHandler) return bioHandler([], []);
  }

  // Route to subcommand handler
  const handler = handlers.get(subcommand.toLowerCase());
  if (handler) return handler(args, flags);

  return errorMessage(trimmed);
}

function errorMessage(input: string): string {
  const messages = [
    `Hmm, I don't know that one. Try 'fayzan --help' to see what I can do, or use the buttons below.`,
    `Not sure what '<span class="text-muted">${escapeHtml(input)}</span>' means \u2014 type 'fayzan --help' for a list of commands, or just tap one of the options below.`,
  ];
  return `<span class="text-red">${messages[Math.floor(Math.random() * messages.length)]}</span>`;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
```

- [ ] **Step 2: Create handlers.ts — all command handlers**

```typescript
import { register } from './commands';
import * as data from './data';

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function registerAllHandlers(): void {
  register('bio', () => escapeHtml(data.bio));

  register('help', () => `Usage: fayzan &lt;command&gt; [options]

<span class="text-muted">Commands:</span>
  <span class="text-cyan">projects</span>      See what I've built
  <span class="text-cyan">experience</span>    Where I've worked
  <span class="text-cyan">skills</span>        What I work with
  <span class="text-cyan">education</span>     Where I studied
  <span class="text-cyan">contact</span>       Get in touch with me
  <span class="text-cyan">resume</span>        Download my resume
  <span class="text-cyan">socials</span>       Find me online

<span class="text-muted">Options:</span>
  --help        Show this help message
  --version     Show version info

Run 'fayzan &lt;command&gt;' to explore. Or just click a button below.`);

  register('version', () => `<span class="text-muted">${data.version}</span>`);

  register('projects', (args) => {
    if (args.length > 0) {
      return projectDetail(args.join(' '));
    }
    return projectList();
  });

  register('experience', () => {
    return data.experience.map(exp =>
      `<span class="text-cyan">${exp.role}</span> @ ${exp.company}
<span class="text-muted">${exp.location} | ${exp.dates}</span>
${exp.description}
`).join('\n');
  });

  register('skills', () => {
    return data.skills.map(cat =>
      `<span class="text-cyan">${cat.category}</span>
  ${cat.items.map(item => `[${item}]`).join(' ')}`
    ).join('\n\n');
  });

  register('education', () => {
    const edu = data.education;
    const cert = data.certification;
    return `<span class="text-cyan">${edu.degree}</span>
${edu.institution} \u2014 ${edu.location}
Expected Graduation: ${edu.expected}
GPA: ${edu.gpa}
Awards: ${edu.awards}
Coursework: ${edu.coursework}

<span class="text-cyan">${cert.name}</span>
${cert.issuer} \u2014 ${cert.date}`;
  });

  register('contact', () => {
    return `<span class="text-cyan">Email:</span>    <a href="mailto:${data.contact.email}">${data.contact.email}</a>
<span class="text-cyan">Phone:</span>    <a href="tel:${data.contact.phone}">${data.contact.phone}</a>
<span class="text-cyan">Status:</span>   ${data.contact.citizenship}`;
  });

  register('resume', () => {
    // Trigger the actual download
    const link = document.createElement('a');
    link.href = '/fayzan-resume.pdf';
    link.download = 'fayzan-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return `Downloading resume...
<span class="text-green">\u2713 fayzan-resume.pdf saved.</span>`;
  });

  register('socials', () => {
    return data.socials.map(s =>
      `<span class="text-cyan">${s.platform}:</span>  <a href="${s.url}" target="_blank" rel="noopener">${s.url}</a>`
    ).join('\n');
  });
}

function projectList(): string {
  const nameWidth = Math.max(...data.projects.map(p => p.name.length));
  return data.projects.map(p => {
    const paddedName = p.name.padEnd(nameWidth + 2);
    return `<span class="text-cyan">${paddedName}</span><span class="text-muted">${p.stack}</span>
  ${p.oneLiner}`;
  }).join('\n\n');
}

function projectDetail(slug: string): string {
  const project = data.projects.find(
    p => p.slug.toLowerCase() === slug.toLowerCase() || p.name.toLowerCase() === slug.toLowerCase()
  );
  if (!project) {
    return `<span class="text-red">Project '${escapeHtml(slug)}' not found. Run 'f projects' to see available projects.</span>`;
  }

  let output = `<span class="text-cyan">${project.name}</span>
${project.description}

<span class="text-muted">Stack:</span>  ${project.stack}
<span class="text-muted">Role:</span>   ${project.role}
<span class="text-muted">GitHub:</span> <a href="${project.github}" target="_blank" rel="noopener">${project.github}</a>`;

  if (project.npm) {
    output += `\n<span class="text-muted">npm:</span>    <a href="${project.npm}" target="_blank" rel="noopener">${project.npm}</a>`;
  }
  if (project.live) {
    output += `\n<span class="text-muted">Live:</span>   <a href="${project.live}" target="_blank" rel="noopener">${project.live}</a>`;
  }

  return output;
}
```

- [ ] **Step 3: Update main.ts to wire commands to terminal**

```typescript
import './style.css';
import { Terminal } from './terminal';
import { execute } from './commands';
import { registerAllHandlers } from './handlers';

const container = document.getElementById('terminal');
if (!container) throw new Error('Missing #terminal container');

const terminal = new Terminal(container);

// Register all command handlers
registerAllHandlers();

// Wire terminal input to command execution
terminal.onSubmit(async (input: string) => {
  const output = await execute(input);
  if (output) {
    terminal.print(output);
  }
});

// Make interactive immediately (autoplay will be added in Task 6)
terminal.setInteractive(true);
terminal.print("Type 'fayzan --help' to get started.");
```

- [ ] **Step 4: Test all commands in the browser**

Run: `npm run dev`

Test each command manually:
- `fayzan` → bio text
- `fayzan --help` → help menu
- `fayzan --version` → v3.8.0
- `f projects` → project list
- `f projects claude-check` → project detail
- `f projects nonexistent` → friendly error
- `f experience` → 3 entries
- `f skills` → grouped skills
- `f education` → degree + cert
- `f contact` → email, phone, citizenship
- `f resume` → download message (will 404 without PDF, that's expected)
- `f socials` → GitHub, LinkedIn links
- `gibberish` → friendly error message

- [ ] **Step 5: Commit**

```bash
git add src/commands.ts src/handlers.ts src/main.ts
git commit -m "feat: add command registry and all portfolio command handlers"
```

---

### Task 5: Special Commands — clear, history, tab autocomplete

**Files:**
- Modify: `src/handlers.ts`
- Modify: `src/terminal.ts`
- Modify: `src/main.ts`

- [ ] **Step 1: Add clear and history handlers**

In `handlers.ts`, add inside `registerAllHandlers()`:

```typescript
// 'clear' is special — it needs terminal reference, so we'll register it from main.ts
// 'history' also needs terminal reference for command history
```

In `main.ts`, add after `registerAllHandlers()`:

```typescript
import { register } from './commands';

// Special commands that need terminal reference
register('clear', () => {
  terminal.clearOutput();
  return '';
});

register('history', () => {
  const history = terminal.getHistory();
  if (history.length === 0) return '<span class="text-muted">No commands in history.</span>';
  return history.map((cmd, i) => `  <span class="text-muted">${String(i + 1).padStart(4)}</span>  ${cmd}`).join('\n');
});
```

- [ ] **Step 2: Add tab autocomplete to terminal.ts**

In the `attachKeyListeners` method, replace the Tab handler placeholder:

```typescript
if (ke.key === 'Tab') {
  ke.preventDefault();
  const current = this.getInput().trim().toLowerCase();
  if (!current) return;

  const allCommands = this.getAutocompleteCommands();
  const matches = allCommands.filter(c => c.startsWith(current));

  if (matches.length === 1) {
    this.setInput(matches[0]);
  } else if (matches.length > 1) {
    // Show possible completions
    this.print(`<span class="text-muted">${matches.join('  ')}</span>`);
  }
}
```

Add a new property and method to the Terminal class:

```typescript
private autocompleteCommands: string[] = [];

setAutocompleteCommands(commands: string[]): void {
  this.autocompleteCommands = commands;
}

private getAutocompleteCommands(): string[] {
  return this.autocompleteCommands;
}
```

- [ ] **Step 3: Wire autocomplete commands in main.ts**

After registering all handlers, add:

```typescript
import { getRegisteredCommands } from './commands';

// Build autocomplete list: full commands like "fayzan projects", "f projects", etc.
const subcommands = ['projects', 'experience', 'skills', 'education', 'contact', 'resume', 'socials'];
const autocompleteList = [
  'fayzan', 'fayzan --help', 'fayzan --version',
  'f', 'f --help', 'f --version',
  ...subcommands.map(s => `fayzan ${s}`),
  ...subcommands.map(s => `f ${s}`),
  'clear', 'history', 'sudo hire fayzan',
];
terminal.setAutocompleteCommands(autocompleteList);
```

- [ ] **Step 4: Test in browser**

- Type `fay` + Tab → should autocomplete to `fayzan`
- Type `f pro` + Tab → should autocomplete to `f projects`
- Type `f` + Tab → should show all `f` commands
- `clear` → output clears
- Type some commands, then `history` → numbered list

- [ ] **Step 5: Commit**

```bash
git add src/terminal.ts src/handlers.ts src/main.ts
git commit -m "feat: add clear, history, and tab autocomplete"
```

---

### Task 6: Autoplay Sequence

**Files:**
- Create: `src/autoplay.ts`
- Modify: `src/main.ts`

- [ ] **Step 1: Create autoplay.ts**

```typescript
import { Terminal } from './terminal';

export async function runAutoplay(terminal: Terminal): Promise<void> {
  let skipped = false;

  const skipHandler = () => {
    skipped = true;
  };

  // Listen for skip (click or keypress)
  document.addEventListener('click', skipHandler, { once: true });
  document.addEventListener('keydown', skipHandler, { once: true });

  const delay = (ms: number) =>
    new Promise<void>(resolve => {
      if (skipped) return resolve();
      setTimeout(resolve, ms);
    });

  // Step 1: Type the install command
  if (!skipped) {
    await terminal.printTyped('$ npm install fayzan-portfolio', 60);
  }

  await delay(300);

  if (skipped) {
    // Skip: print everything at once
    cleanup();
    printFinalState(terminal);
    return;
  }

  // Step 2: Install animation
  terminal.print('');
  terminal.print('<span class="text-muted">Resolving dependencies...</span>');
  await delay(600);

  // Progress bar animation
  const barLength = 24;
  const progressLine = document.createElement('div');
  progressLine.className = 'output-line';
  terminal.getOutputEl().appendChild(progressLine);

  for (let i = 0; i <= barLength; i++) {
    if (skipped) break;
    const filled = '\u2588'.repeat(i);
    const empty = '\u2591'.repeat(barLength - i);
    const pct = Math.round((i / barLength) * 100);
    progressLine.textContent = `[${filled}${empty}] ${pct}%`;
    terminal.scrollToBottom();
    await delay(80);
  }

  if (skipped) {
    cleanup();
    printFinalState(terminal);
    return;
  }

  await delay(200);
  terminal.print('<span class="text-muted">added 1 package, audited 1 package in 2.4s</span>');
  await delay(400);
  terminal.print('');
  terminal.print('<span class="text-green">\u2713 fayzan-portfolio@1.0.0 installed successfully</span>');
  await delay(300);
  terminal.print('');
  terminal.print("Type 'fayzan --help' to get started.");

  cleanup();

  function cleanup() {
    document.removeEventListener('click', skipHandler);
    document.removeEventListener('keydown', skipHandler);
  }
}

function printFinalState(terminal: Terminal): void {
  terminal.clearOutput();
  const block = '\u2588';
  terminal.print('<span class="text-muted">$ npm install fayzan-portfolio</span>');
  terminal.print('');
  terminal.print('<span class="text-muted">Resolving dependencies...</span>');
  terminal.print(`[${block.repeat(24)}] 100%`);
  terminal.print('<span class="text-muted">added 1 package, audited 1 package in 2.4s</span>');
  terminal.print('');
  terminal.print('<span class="text-green">\u2713 fayzan-portfolio@1.0.0 installed successfully</span>');
  terminal.print('');
  terminal.print("Type 'fayzan --help' to get started.");
}
```

- [ ] **Step 2: Expose `getOutputEl()` and `scrollToBottom()` on Terminal**

Add to `terminal.ts`:

```typescript
getOutputEl(): HTMLElement {
  return this.outputEl;
}

scrollToBottom(): void {
  this.outputEl.scrollTop = this.outputEl.scrollHeight;
}
```

- [ ] **Step 3: Update main.ts to run autoplay before interactive mode**

Replace the current main.ts content:

```typescript
import './style.css';
import { Terminal } from './terminal';
import { execute, register, getRegisteredCommands } from './commands';
import { registerAllHandlers } from './handlers';
import { runAutoplay } from './autoplay';

const container = document.getElementById('terminal');
if (!container) throw new Error('Missing #terminal container');

const terminal = new Terminal(container);

// Register all command handlers
registerAllHandlers();

// Special commands that need terminal reference
register('clear', () => {
  terminal.clearOutput();
  return '';
});

register('history', () => {
  const history = terminal.getHistory();
  if (history.length === 0) return '<span class="text-muted">No commands in history.</span>';
  return history.map((cmd, i) => `  <span class="text-muted">${String(i + 1).padStart(4)}</span>  ${cmd}`).join('\n');
});

// Wire terminal input to command execution
terminal.onSubmit(async (input: string) => {
  const output = await execute(input);
  if (output) {
    terminal.print(output);
  }
});

// Build autocomplete list
const subcommands = ['projects', 'experience', 'skills', 'education', 'contact', 'resume', 'socials'];
const autocompleteList = [
  'fayzan', 'fayzan --help', 'fayzan --version',
  'f', 'f --help', 'f --version',
  ...subcommands.map(s => `fayzan ${s}`),
  ...subcommands.map(s => `f ${s}`),
  'clear', 'history', 'sudo hire fayzan',
];
terminal.setAutocompleteCommands(autocompleteList);

// Set up navigation chips
const chipCommands = [
  { label: 'help', command: 'fayzan --help' },
  { label: 'projects', command: 'fayzan projects' },
  { label: 'experience', command: 'fayzan experience' },
  { label: 'skills', command: 'fayzan skills' },
  { label: 'contact', command: 'fayzan contact' },
  { label: 'resume', command: 'fayzan resume' },
];
chipCommands.forEach(({ label, command }) => terminal.addChip(label, command));

// Run autoplay, then enable interactive mode
async function boot() {
  await runAutoplay(terminal);
  terminal.setInteractive(true);
  terminal.showChips();
}

boot();
```

- [ ] **Step 4: Test autoplay in browser**

Run: `npm run dev`

- Page loads → typing animation plays → progress bar fills → success message → cursor activates → chips fade in
- Refresh and click during animation → skips to final state instantly
- After autoplay, commands work normally

- [ ] **Step 5: Commit**

```bash
git add src/autoplay.ts src/terminal.ts src/main.ts
git commit -m "feat: add autoplay install animation with skip support"
```

---

### Task 7: Easter Eggs — sudo hire fayzan + Confetti

**Files:**
- Create: `src/easter-eggs.ts`
- Modify: `src/main.ts`
- Modify: `src/style.css`

- [ ] **Step 1: Create easter-eggs.ts**

```typescript
import { Terminal } from './terminal';

let hasHired = false;

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function handleSudoHire(terminal: Terminal): Promise<string> {
  if (hasHired) {
    return '<span class="text-green">You already sent the offer! Check your inbox.</span>';
  }

  hasHired = true;

  const lines = [
    '[sudo] password for recruiter: ********',
    'Verifying credentials...',
    '<span class="text-green">\u2713 Permission granted.</span>',
    'Sending offer letter to fayzanm786@gmail.com...',
    '<span class="text-green">\u2713 Offer sent. Welcome aboard!</span>',
  ];

  const delays = [400, 800, 400, 600, 400];

  for (let i = 0; i < lines.length; i++) {
    terminal.print(lines[i]);
    if (i === lines.length - 1) {
      launchConfetti();
    }
    await new Promise(r => setTimeout(r, delays[i]));
  }

  return '';
}

function launchConfetti(): void {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  const particles: Particle[] = [];
  const colors = ['#ff5f57', '#febc2e', '#28c840', '#56b6c2', '#e06c75', '#c678dd'];

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
  }

  // Create particles
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 3 + 2,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      opacity: 1,
    });
  }

  const startTime = Date.now();
  const duration = 3000;

  function animate() {
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fade out in the last second
    const fadeStart = duration - 1000;
    const globalOpacity = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / 1000 : 1;

    for (const p of particles) {
      p.x += p.vx;
      p.vy += 0.1; // gravity
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.globalAlpha = globalOpacity * p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
```

- [ ] **Step 2: Add confetti canvas style to style.css**

Append to `src/style.css`:

```css
/* Confetti overlay */
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
}
```

- [ ] **Step 3: Register easter egg commands in main.ts**

Add to `main.ts` after other `register()` calls:

```typescript
import { handleSudoHire } from './easter-eggs';

register('sudo hire fayzan', async () => {
  await handleSudoHire(terminal);
  return '';
});

// Handle other sudo commands
register('sudo', (_args) => {
  return "Nice try. But the only command I'll sudo is 'sudo hire fayzan'.";
});
```

Update the command registry (`commands.ts`) to check for full-string matches before parsing. The existing `execute()` function already checks `handlers.get(trimmed.toLowerCase())` first, which will match `sudo hire fayzan`. For partial `sudo` commands, the parser will extract `sudo` as the base command and route to the sudo handler.

- [ ] **Step 4: Test in browser**

- `sudo hire fayzan` → sequential messages with delays → confetti animation → fades out
- `sudo hire fayzan` again → "You already sent the offer! Check your inbox."
- `sudo rm -rf /` → "Nice try. But the only command I'll sudo is 'sudo hire fayzan'."

- [ ] **Step 5: Commit**

```bash
git add src/easter-eggs.ts src/style.css src/main.ts
git commit -m "feat: add sudo hire fayzan easter egg with confetti"
```

---

### Task 8: Responsive Polish & Final Styling

**Files:**
- Modify: `src/style.css`
- Modify: `index.html`

- [ ] **Step 1: Add mobile-specific styles and polish**

Ensure these are in `style.css`:

```css
/* Mobile: full viewport terminal */
@media (max-width: 640px) {
  .terminal-window {
    height: 100vh;
    height: 100dvh; /* dynamic viewport height for mobile browsers */
    border: none;
    border-radius: 0;
  }

  .title-bar {
    border-radius: 0;
  }

  .terminal-output {
    padding: 12px;
    font-size: 13px;
  }

  .input-line {
    padding: 8px 12px;
  }
}

/* Smooth scrollbar for output */
.terminal-output::-webkit-scrollbar {
  width: 6px;
}

.terminal-output::-webkit-scrollbar-track {
  background: transparent;
}

.terminal-output::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

/* Cursor blink animation */
.input-text:empty::after {
  content: '\00a0';
  animation: blink 1s step-end infinite;
  border-left: 2px solid var(--text);
  margin-left: -1px;
}

.input-text:focus:empty::after {
  content: '';
}

@keyframes blink {
  50% { border-color: transparent; }
}

/* Selection styling */
::selection {
  background: rgba(86, 182, 194, 0.3);
}
```

- [ ] **Step 2: Add favicon and OpenGraph meta tags to index.html**

Add to `<head>` in `index.html`:

```html
<meta property="og:title" content="Fayzan Malik — Portfolio" />
<meta property="og:description" content="Computer Science student, full stack developer, builder. Explore my work in a terminal." />
<meta property="og:type" content="website" />
<meta name="theme-color" content="#0a0a0a" />
```

- [ ] **Step 3: Test responsive behavior**

Run: `npm run dev`

- Desktop: terminal floats centered with border radius and padding
- Resize to < 640px: terminal fills viewport, no border, chips become scrollable
- Test chip tapping works on mobile viewport
- Verify auto-scroll works with long output

- [ ] **Step 4: Commit**

```bash
git add src/style.css index.html
git commit -m "feat: add responsive polish, cursor blink, scrollbar styling"
```

---

### Task 9: Build Verification & Deployment Prep

**Files:**
- Modify: `package.json` (if needed)
- Create: `.gitignore` (if not created in Task 1)

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: `dist/` folder created with `index.html`, JS bundle, CSS, and `fayzan-resume.pdf` (if present in `public/`)

- [ ] **Step 3: Preview production build**

Run: `npm run preview`
Expected: Site works identically to dev mode — autoplay runs, commands work, chips work, confetti works

- [ ] **Step 4: Test all commands one final time**

Go through every command:
- `fayzan` → bio
- `fayzan --help` → help menu
- `fayzan --version` → v3.8.0
- `f projects` → list
- `f projects claude-check` → detail
- `f projects bad-name` → friendly error
- `f experience` → 3 entries
- `f skills` → 4 categories
- `f education` → degree + cert
- `f contact` → email, phone, citizenship
- `f resume` → download triggers
- `f socials` → links
- `clear` → clears
- `history` → list
- `sudo hire fayzan` → message + confetti
- Up/Down arrows → history cycling
- Tab → autocomplete
- Clicking chips → executes commands
- Random input → friendly error

- [ ] **Step 5: Commit final state**

```bash
git add -A
git commit -m "feat: verify production build and complete terminal portfolio"
```

---

## Task Dependency Summary

```
Task 1 (Scaffold) → Task 2 (Data) → Task 3 (Terminal Engine) → Task 4 (Commands & Handlers)
                                                                         ↓
                                                               Task 5 (Special Commands)
                                                                         ↓
                                                               Task 6 (Autoplay)
                                                                         ↓
                                                               Task 7 (Easter Eggs)
                                                                         ↓
                                                               Task 8 (Responsive Polish)
                                                                         ↓
                                                               Task 9 (Build Verification)
```

All tasks are sequential — each builds on the previous.
