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

## Task 1: Run `/impeccable teach`

**Purpose:** Establish the design context before writing any code. This skill teaches the AI the project's visual language and aesthetic intent.

**Files:** None modified yet.

- [ ] **Step 1: Invoke the teach skill**

  Run: `/impeccable teach`

  When prompted, provide this context:
  ```
  Portfolio site for Fayzan Malik — CS student, AI builder, CTO.
  Dark aesthetic, terminal-inspired, professional but technical.
  Color palette: near-black bg (#0a0a0a), terminal green accent (#00ff88),
  white headings, subtle surface (#111111), tight borders (#1e1e1e).
  Fonts: Inter for prose, JetBrains Mono for code/tags/labels.
  The CLI terminal is embedded in the hero — the whole site should feel
  like the CLI's natural environment, not a wrapper around it.
  Reference: itaisigler.com — minimal, confident, text-forward.
  NOT: generic AI portfolio slop, gradient abuse, card shadows everywhere.
  ```

- [ ] **Step 2: Confirm the skill has captured the aesthetic context**

  The skill should output a design profile. Review it — if it missed the terminal-native feel or the restraint, clarify before moving on.

- [ ] **Step 3: Commit**

  ```bash
  git add -A
  git commit -m "chore: run impeccable teach — establish design context"
  ```
  (Commit any files the skill may have written, e.g. design context file)

---

## Task 2: CSS Foundation — Theme Variables, Overflow Fix, Scroll Reveal System

**Purpose:** Fix the one CSS conflict that would break the landing page (overflow:hidden), add theme-ready CSS custom properties, and define the scroll reveal animation system.

**Files:**
- Modify: `src/style.css`

- [ ] **Step 1: Remove `overflow: hidden` from `html, body`**

  In `src/style.css`, change lines 21–28 from:
  ```css
  html, body {
    height: 100%;
    background: var(--bg);
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--text);
    overflow: hidden;
  }
  ```
  To:
  ```css
  html, body {
    height: 100%;
    background: var(--bg);
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--text);
  }
  ```

- [ ] **Step 2: Verify terminal still renders**

  Run: `npm run dev`
  Open browser. The terminal should still display and function normally at `localhost:5173`.
  The page should now be scrollable (though there's nothing to scroll yet).

- [ ] **Step 3: Append landing page CSS foundation block to `src/style.css`**

  Add this entire block at the very bottom of `src/style.css`:

  ```css
  /* =============================================================
     LANDING PAGE STYLES
     All rules below this line are for the landing page only.
     Terminal styles above are untouched.
     ============================================================= */

  /* ── Theme: Dark (default) ─────────────────────────────────── */
  html[data-theme="dark"] {
    --surface: #111111;
    --border: #1e1e1e;
    --accent: #00ff88;
    --text-landing: #ffffff;
    --text-secondary: #a0a0a0;
  }

  /* ── Global landing page resets ────────────────────────────── */
  .landing-page {
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--text-landing);
  }

  .landing-page *:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  /* ── Scroll reveal system ───────────────────────────────────── */
  [data-animate] {
    opacity: 0;
    transition: opacity 500ms ease-out, transform 500ms ease-out;
  }

  [data-animate="fade-up"] {
    transform: translateY(24px);
  }

  [data-animate="fade-left"] {
    transform: translateX(-24px);
  }

  [data-animate="fade-right"] {
    transform: translateX(24px);
  }

  [data-animate="scale-in"] {
    transform: scale(0.95);
    transition-duration: 400ms;
  }

  [data-animate].visible {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1);
  }

  @media (prefers-reduced-motion: reduce) {
    [data-animate] {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  /* ── Section shared styles ──────────────────────────────────── */
  .section {
    padding: 120px 0;
    max-width: 1100px;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
  }

  .section-label {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  .section-title {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 800;
    color: var(--text-landing);
    margin-bottom: 56px;
    line-height: 1.2;
  }

  /* ── Tag shared styles (used in projects + skills) ──────────── */
  .tag {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 11px;
    font-weight: 400;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    padding: 2px 8px;
    border-radius: 4px;
    transition: border-color 150ms ease, background 150ms ease;
    white-space: nowrap;
  }

  .tag:hover {
    border-color: var(--accent);
    background: rgba(0, 255, 136, 0.05);
  }
  ```

- [ ] **Step 4: Verify dev server still runs without errors**

  Run: `npm run dev`
  Check browser console — no CSS errors.

- [ ] **Step 5: Commit**

  ```bash
  git add src/style.css
  git commit -m "feat: add landing page CSS foundation — theme vars, scroll reveal, shared styles"
  ```

---

## Task 3: Rebuild `index.html` — Full Page Structure

**Purpose:** Replace the minimal `index.html` with the complete landing page HTML. All sections are static. The `#terminal` div stays in place in the hero.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace `index.html` with the full landing page**

  ```html
  <!DOCTYPE html>
  <html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fayzan Malik — Portfolio</title>
    <meta name="description" content="Fayzan Malik — CS student, full stack developer, and AI builder. Co-Founder & CTO at Chox AI." />
    <meta property="og:title" content="Fayzan Malik — Portfolio" />
    <meta property="og:description" content="CS student, full stack developer, and AI builder. Co-Founder & CTO at Chox AI." />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#0a0a0a" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/style.css" />
  </head>
  <body class="landing-page">

    <!-- ── NAVBAR ─────────────────────────────────────────── -->
    <nav class="nav" id="nav">
      <div class="nav-inner">
        <a class="nav-logo" href="#">Fayzan Malik</a>
        <ul class="nav-links">
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>

    <!-- ── HERO ───────────────────────────────────────────── -->
    <section class="hero" id="hero">
      <div class="hero-inner">
        <div class="hero-left">
          <img
            src="/headshot.jpg"
            alt="Fayzan Malik"
            class="hero-headshot"
            data-animate="fade-right"
          />
          <h1 class="hero-name" data-animate="fade-right">Fayzan Malik</h1>
          <div class="hero-accent-line" aria-hidden="true"></div>
          <p class="hero-title" data-animate="fade-right">Co-Founder &amp; CTO, Chox AI &middot; CS @ Western</p>
          <p class="hero-bio" data-animate="fade-right">Hey, I'm Fayzan — a Computer Science student at Western University, full stack developer, and builder. I'm into AI agents, CLI tools, and shipping things that actually work.</p>
          <div class="hero-ctas" data-animate="fade-right">
            <a href="/fayzan-resume.pdf" download="fayzan-resume.pdf" class="btn-primary">Download Resume</a>
            <a href="#projects" class="btn-secondary">View Projects</a>
          </div>
        </div>
        <div class="hero-right" data-animate="fade-left">
          <div class="cli-window">
            <div class="cli-chrome" aria-hidden="true">
              <div class="cli-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <span class="cli-title-text">fayzan@portfolio ~ %</span>
            </div>
            <div id="terminal" aria-label="Interactive terminal — type 'fayzan help' to get started"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── EXPERIENCE ─────────────────────────────────────── -->
    <section class="section" id="experience" data-animate="fade-up">
      <p class="section-label">Work</p>
      <h2 class="section-title">Experience</h2>
      <div class="timeline">

        <div class="timeline-entry" data-animate="fade-left">
          <div class="timeline-marker" aria-hidden="true"></div>
          <div class="timeline-content">
            <h3 class="timeline-role">Co-Founder &amp; CTO</h3>
            <p class="timeline-company">Chox AI &mdash; Remote</p>
            <p class="timeline-dates">January 2026 – Present</p>
            <p class="timeline-desc">Built a Go HTTP proxy that sits between AI agents and external APIs, intercepting requests to classify actions, extract structured signals, and enforce governance policies before forwarding traffic. Implemented an argument-aware risk scoring and shadow-verdict pipeline for agent tool calls, classifying actions such as read, write, delete, and financial operations before enforcement is enabled. Developed the core Go backend and React dashboard for monitoring high-risk API actions, audit logs, and rule-based governance across developer-built AI agents.</p>
          </div>
        </div>

        <div class="timeline-entry" data-animate="fade-left">
          <div class="timeline-marker" aria-hidden="true"></div>
          <div class="timeline-content">
            <h3 class="timeline-role">President &amp; Founder</h3>
            <p class="timeline-company">Western Agentic Development Club, Western University &mdash; London, ON</p>
            <p class="timeline-dates">March 2026 – Present</p>
            <p class="timeline-desc">Founded and currently lead a student-run agentic AI community for computer science students at Western University. Organize workshops, hackathons, and networking events on autonomous agent development using n8n, LangGraph, and MCP-based workflows. Oversee club-led projects where members collaborate across teams to build and ship practical AI agent solutions.</p>
          </div>
        </div>

        <div class="timeline-entry" data-animate="fade-left">
          <div class="timeline-marker" aria-hidden="true"></div>
          <div class="timeline-content">
            <h3 class="timeline-role">Backend Development Intern</h3>
            <p class="timeline-company">ICARO Media Group &mdash; Thornhill, ON</p>
            <p class="timeline-dates">July 2025 – September 2025</p>
            <p class="timeline-desc">Refactored and upgraded LAMP-based web applications, reducing production friction across internal workflows. Standardized AWS EC2 development environments for 5+ developers, improving release reliability and test consistency. Built Flask REST APIs and resolved latency bottlenecks via profiling, improving median API response time by 15% under peak load.</p>
          </div>
        </div>

        <div class="timeline-entry" data-animate="fade-left">
          <div class="timeline-marker" aria-hidden="true"></div>
          <div class="timeline-content">
            <h3 class="timeline-role">Data Analyst Intern</h3>
            <p class="timeline-company">Elite Life Financial &mdash; Toronto, ON</p>
            <p class="timeline-dates">June 2024 – September 2024</p>
            <p class="timeline-desc">Analyzed 500+ client records with SQL and Python, improving recommendation logic and advisor-client personalization. Automated repetitive workflows with optimized SQL queries and scripts, reducing manual processing time by 30%.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- ── PROJECTS ────────────────────────────────────────── -->
    <section class="section" id="projects" data-animate="fade-up">
      <p class="section-label">Work</p>
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">

        <div class="project-card" data-animate="scale-in">
          <h3 class="project-name">agency-agents <span class="project-badge">Open Source</span></h3>
          <p class="project-oneliner">Merged a LinkedIn Content Creator agent into the #1 trending GitHub repo (65,000+ stars).</p>
          <div class="project-tags">
            <span class="tag">Bash</span>
            <span class="tag">Claude</span>
            <span class="tag">GitHub</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/msitarzewski/agency-agents" target="_blank" rel="noopener noreferrer" class="project-link">GitHub →</a>
          </div>
        </div>

        <div class="project-card" data-animate="scale-in">
          <h3 class="project-name">claude-check</h3>
          <p class="project-oneliner">A CLI tool with 650+ downloads that scores your prompt before you send it to Claude.</p>
          <div class="project-tags">
            <span class="tag">Node.js</span>
            <span class="tag">TypeScript</span>
            <span class="tag">Anthropic API</span>
            <span class="tag">CLI Tooling</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/fayzan123/claude-check" target="_blank" rel="noopener noreferrer" class="project-link">GitHub →</a>
            <a href="https://www.npmjs.com/package/claude-check" target="_blank" rel="noopener noreferrer" class="project-link">npm →</a>
          </div>
        </div>

        <div class="project-card" data-animate="scale-in">
          <h3 class="project-name">ThisThenThat</h3>
          <p class="project-oneliner">Upload your assignment PDF and get a step-by-step game plan with AI chat per step.</p>
          <div class="project-tags">
            <span class="tag">Next.js</span>
            <span class="tag">TypeScript</span>
            <span class="tag">Supabase</span>
            <span class="tag">Tailwind</span>
            <span class="tag">Claude API</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/fayzan123/thisthenthat" target="_blank" rel="noopener noreferrer" class="project-link">GitHub →</a>
            <a href="https://thisthenthat.vercel.app" target="_blank" rel="noopener noreferrer" class="project-link">Live →</a>
          </div>
        </div>

        <div class="project-card" data-animate="scale-in">
          <h3 class="project-name">ClearCare</h3>
          <p class="project-oneliner">A rural healthcare referral platform that could save $15,000+ per avoided airlift.</p>
          <div class="project-tags">
            <span class="tag">React</span>
            <span class="tag">TypeScript</span>
            <span class="tag">FastAPI</span>
            <span class="tag">PostgreSQL</span>
            <span class="tag">Vapi</span>
            <span class="tag">Twilio</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/Deogan7/ClearCare" target="_blank" rel="noopener noreferrer" class="project-link">GitHub →</a>
          </div>
        </div>

        <div class="project-card" data-animate="scale-in">
          <h3 class="project-name">Chox AI</h3>
          <p class="project-oneliner">An AI agent governance layer that classifies and risk-scores tool calls in real time.</p>
          <div class="project-tags">
            <span class="tag">Go</span>
            <span class="tag">React</span>
            <span class="tag">TypeScript</span>
            <span class="tag">PostgreSQL</span>
            <span class="tag">Docker</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/fayzan123/chox-ai" target="_blank" rel="noopener noreferrer" class="project-link">GitHub →</a>
          </div>
        </div>

        <div class="project-card" data-animate="scale-in">
          <h3 class="project-name">Claude Skills</h3>
          <p class="project-oneliner">Published Claude skills for reusable context handoff and evidence-backed product analysis.</p>
          <div class="project-tags">
            <span class="tag">Claude</span>
            <span class="tag">Markdown</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/fayzan123/claude-skills" target="_blank" rel="noopener noreferrer" class="project-link">GitHub →</a>
          </div>
        </div>

        <div class="project-card" data-animate="scale-in">
          <h3 class="project-name">Binary Tree Traversal Practice Tool</h3>
          <p class="project-oneliner">A gamified platform used by 100+ students for practicing binary tree traversals.</p>
          <div class="project-tags">
            <span class="tag">React</span>
            <span class="tag">JavaScript</span>
            <span class="tag">Firebase</span>
            <span class="tag">Gemini</span>
            <span class="tag">OpenAI</span>
          </div>
          <div class="project-links">
            <a href="https://binarytreelearner.net" target="_blank" rel="noopener noreferrer" class="project-link">Live →</a>
          </div>
        </div>

        <div class="project-card" data-animate="scale-in">
          <h3 class="project-name">Titanic Survival Prediction</h3>
          <p class="project-oneliner">ML model comparison for Titanic survival classification.</p>
          <div class="project-tags">
            <span class="tag">Python</span>
            <span class="tag">Pandas</span>
            <span class="tag">Scikit-learn</span>
            <span class="tag">TensorFlow</span>
            <span class="tag">Seaborn</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/fayzan123/Titanic-Survival-Prediction" target="_blank" rel="noopener noreferrer" class="project-link">GitHub →</a>
          </div>
        </div>

      </div>
    </section>

    <!-- ── SKILLS ──────────────────────────────────────────── -->
    <section class="section" id="skills" data-animate="fade-up">
      <p class="section-label">Toolkit</p>
      <h2 class="section-title">Skills</h2>
      <div class="skills-grid">

        <div class="skill-group" data-animate="fade-up">
          <h3 class="skill-category">Languages</h3>
          <div class="skill-tags">
            <span class="tag">Python</span><span class="tag">Java</span><span class="tag">C</span>
            <span class="tag">Go</span><span class="tag">TypeScript</span><span class="tag">JavaScript</span>
            <span class="tag">SQL</span><span class="tag">HTML/CSS</span><span class="tag">R</span><span class="tag">Bash</span>
          </div>
        </div>

        <div class="skill-group" data-animate="fade-up">
          <h3 class="skill-category">Frameworks &amp; Libraries</h3>
          <div class="skill-tags">
            <span class="tag">React</span><span class="tag">Flask</span><span class="tag">Next.js</span>
            <span class="tag">FastAPI</span><span class="tag">Node.js</span><span class="tag">Tailwind CSS</span>
            <span class="tag">NumPy</span><span class="tag">Pandas</span><span class="tag">Matplotlib</span>
            <span class="tag">TensorFlow</span><span class="tag">Scikit-learn</span><span class="tag">PyTorch</span><span class="tag">Seaborn</span>
          </div>
        </div>

        <div class="skill-group" data-animate="fade-up">
          <h3 class="skill-category">Databases</h3>
          <div class="skill-tags">
            <span class="tag">MySQL</span><span class="tag">PostgreSQL</span>
          </div>
        </div>

        <div class="skill-group" data-animate="fade-up">
          <h3 class="skill-category">AI / LLM</h3>
          <div class="skill-tags">
            <span class="tag">Codex</span><span class="tag">Claude Code</span><span class="tag">Gemini</span>
            <span class="tag">LangGraph</span><span class="tag">CrewAI</span><span class="tag">AutoGen</span>
            <span class="tag">MCP</span><span class="tag">prompt engineering</span>
            <span class="tag">AI agent governance</span><span class="tag">model evaluation</span>
          </div>
        </div>

        <div class="skill-group" data-animate="fade-up">
          <h3 class="skill-category">Platforms &amp; Tools</h3>
          <div class="skill-tags">
            <span class="tag">Git</span><span class="tag">Linux</span><span class="tag">Docker</span>
            <span class="tag">AWS</span><span class="tag">Supabase</span><span class="tag">Firebase</span>
            <span class="tag">Postman</span><span class="tag">VS Code</span><span class="tag">Jupyter</span>
          </div>
        </div>

      </div>
    </section>

    <!-- ── EDUCATION ───────────────────────────────────────── -->
    <section class="section" id="education" data-animate="fade-up">
      <p class="section-label">Background</p>
      <h2 class="section-title">Education</h2>
      <div class="education-grid">

        <div class="education-card" data-animate="fade-left">
          <h3 class="education-institution">Western University</h3>
          <p class="education-degree">Honours Specialization in Computer Science (HBSc)</p>
          <p class="education-meta">London, ON</p>
          <p class="education-dates">Expected May 2027</p>
          <p class="education-gpa">GPA: 3.8</p>
          <p class="education-awards">Western Admission Scholarship; Dean's Honor List 2023, 2024</p>
          <p class="education-coursework"><span class="coursework-label">Coursework:</span> Data Structures and Algorithms, Machine Learning, Databases, Statistics, Operating Systems, Software Engineering</p>
        </div>

        <div class="education-card" data-animate="fade-right">
          <h3 class="education-institution">Certification</h3>
          <p class="education-degree">Machine Learning Specialization by Andrew Ng</p>
          <p class="education-meta">Coursera, DeepLearning.AI</p>
          <p class="education-dates">December 2025</p>
        </div>

      </div>
    </section>

    <!-- ── CONTACT / FOOTER ───────────────────────────────── -->
    <footer class="footer" id="contact">
      <div class="footer-inner">
        <p class="footer-heading">Get in touch</p>
        <div class="footer-links">
          <a href="mailto:fayzanm786@gmail.com" class="footer-link">fayzanm786@gmail.com</a>
          <a href="tel:4372462116" class="footer-link">437-246-2116</a>
          <a href="https://github.com/fayzan123" target="_blank" rel="noopener noreferrer" class="footer-link footer-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/fayzan-malik" target="_blank" rel="noopener noreferrer" class="footer-link footer-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://x.com/fayzanm05" target="_blank" rel="noopener noreferrer" class="footer-link footer-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Twitter
          </a>
        </div>
        <a href="/fayzan-resume.pdf" download="fayzan-resume.pdf" class="footer-resume">Download Resume</a>
        <p class="footer-copy">&copy; 2026 Fayzan Malik</p>
      </div>
    </footer>

    <script type="module" src="/src/main.ts"></script>
    <script type="module" src="/src/landing.ts"></script>
  </body>
  </html>
  ```

- [ ] **Step 2: Verify in browser**

  Run: `npm run dev`
  - Page should render with all sections visible (unstyled is fine)
  - The terminal should boot and function inside the hero
  - No console errors
  - Page should scroll

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "feat: rebuild index.html as full landing page"
  ```

---

## Task 4: Run `/shape`

**Purpose:** Use the shape skill to review and refine the structural skeleton of the page layout before adding detailed CSS.

**Files:** `index.html`, `src/style.css` (may be modified by skill)

- [ ] **Step 1: Invoke the shape skill**

  Run: `/shape`

  Context to provide: "Landing page for a developer portfolio. Sections: navbar, hero (2-col: content left, CLI right), experience timeline, projects grid, skills, education, footer. The terminal in the hero is a live interactive feature — it must not be visually competing with the hero content. Clean, restrained layout with strong spatial hierarchy."

- [ ] **Step 2: Apply any structural suggestions from the skill**

  Review the skill's output. Apply layout-level suggestions to `index.html` or the CSS foundation.

- [ ] **Step 3: Commit**

  ```bash
  git add -A
  git commit -m "chore: apply shape skill — layout structure refinements"
  ```

---

## Task 5: Landing Page CSS — All Sections

**Purpose:** Add complete CSS for every page section. The terminal and its existing styles are untouched.

**Files:**
- Modify: `src/style.css` (append to the landing page block)

- [ ] **Step 1: Add navbar CSS**

  Append to the landing page block in `src/style.css`:

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

  .nav-logo:hover {
    color: var(--accent);
  }

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

  .nav-links a:hover {
    color: var(--text-landing);
  }

  .nav-links a:hover::after {
    transform: scaleX(1);
  }
  ```

- [ ] **Step 2: Add hero CSS**

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
    .hero-accent-line {
      animation: none;
      width: 100%;
    }
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

  /* CLI window */
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

  /* Prevent terminal-window from overriding cli-window layout */
  .cli-window .terminal-window {
    max-width: 100%;
    height: 100%;
    margin: 0;
    border: none;
    border-radius: 0;
  }
  ```

- [ ] **Step 3: Add experience timeline CSS**

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

  .timeline-entry:last-child {
    margin-bottom: 0;
  }

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

  .timeline-entry.visible .timeline-marker {
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

- [ ] **Step 4: Add projects grid CSS**

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

  .project-link:hover {
    opacity: 0.7;
  }

  /* Odd last card spans full width */
  .project-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    max-width: 50%;
  }
  ```

- [ ] **Step 5: Add skills CSS**

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

- [ ] **Step 6: Add education CSS**

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

  .education-awards {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
  }

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

- [ ] **Step 7: Add footer CSS**

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

  .footer-link:hover {
    color: var(--accent);
  }

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

  .footer-resume:hover {
    background: rgba(0, 255, 136, 0.08);
  }

  .footer-copy {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 12px;
    color: var(--text-secondary);
    opacity: 0.5;
  }
  ```

- [ ] **Step 8: Add responsive CSS**

  ```css
  /* ── Responsive ─────────────────────────────────────────── */
  @media (max-width: 768px) {
    /* Hero */
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 40px;
      padding-top: 24px;
    }

    .hero-headshot {
      width: 90px;
      height: 90px;
    }

    .hero-ctas {
      flex-direction: column;
    }

    .btn-primary,
    .btn-secondary {
      text-align: center;
    }

    #terminal {
      height: 320px;
    }

    /* Navbar */
    .nav-links {
      gap: 16px;
    }

    .nav-links a {
      font-size: 12px;
    }

    /* Timeline */
    .timeline::before {
      display: none;
    }

    .timeline {
      padding-left: 0;
    }

    .timeline-marker {
      display: none;
    }

    .timeline-entry {
      padding-bottom: 32px;
      border-bottom: 1px solid var(--border);
    }

    .timeline-entry:last-child {
      border-bottom: none;
    }

    /* Projects */
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .project-card:last-child:nth-child(odd) {
      grid-column: auto;
      max-width: 100%;
    }

    /* Education */
    .education-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .nav-links {
      display: none;
    }

    .section {
      padding: 80px 0;
    }
  }
  ```

- [ ] **Step 9: Verify in browser**

  Run: `npm run dev`
  - All sections visible with correct layout
  - Terminal boots in hero right column
  - Navbar visible at top
  - Cards render in 2-column grid
  - Timeline shows entries
  - Resize to mobile — single column layout

- [ ] **Step 10: Commit**

  ```bash
  git add src/style.css
  git commit -m "feat: add complete landing page CSS — all sections + responsive"
  ```

---

## Task 6: Create `src/landing.ts`

**Purpose:** Implement navbar scroll behaviour, scroll reveal with stagger, and smooth anchor scroll.

**Files:**
- Create: `src/landing.ts`

- [ ] **Step 1: Create `src/landing.ts`**

  ```typescript
  // landing.ts — all non-terminal page behaviour
  // Responsibilities: navbar scroll, scroll reveal, smooth anchor scroll
  // Does NOT touch the terminal or #terminal element

  function initNavbar(): void {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const SCROLL_THRESHOLD = 60;

    function updateNav(): void {
      if (window.scrollY > SCROLL_THRESHOLD) {
        nav!.classList.add('scrolled');
      } else {
        nav!.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // run once on load
  }

  function initScrollReveal(): void {
    const elements = document.querySelectorAll<HTMLElement>('[data-animate]');
    if (!elements.length) return;

    // Apply stagger delays to siblings within the same parent
    function applyStagger(parent: Element): void {
      const children = Array.from(
        parent.querySelectorAll<HTMLElement>(':scope > [data-animate]')
      );
      if (children.length < 2) return;

      children.forEach((child, index) => {
        const delay = Math.min(index * 80, 400); // 80ms increments, max 400ms
        child.style.transitionDelay = `${delay}ms`;
      });
    }

    // Apply stagger to known stagger containers
    const staggerContainers = document.querySelectorAll(
      '.projects-grid, .timeline, .skills-grid, .hero-left'
    );
    staggerContainers.forEach(applyStagger);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // only animate once
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
  // Do NOT use DOMContentLoaded here; it may have already fired before
  // this module executes, causing all init functions to silently skip.
  initNavbar();
  initScrollReveal();
  initSmoothScroll();
  ```

- [ ] **Step 2: Verify in browser**

  Run: `npm run dev`
  - Scroll down past 60px — navbar should get the blur background
  - Scroll to a section — elements should fade in
  - Click a nav link — should smooth scroll to section
  - Check DevTools console — no errors

- [ ] **Step 3: Verify stagger on project cards**

  Open DevTools, inspect `.project-card` elements.
  Each card should have an inline `transition-delay` style (0ms, 80ms, 160ms, 240ms...).

- [ ] **Step 4: Commit**

  ```bash
  git add src/landing.ts
  git commit -m "feat: add landing.ts — navbar scroll, scroll reveal with stagger, smooth scroll"
  ```

---

## Task 7: Run `/impeccable craft`

**Purpose:** Primary visual refinement pass. The impeccable craft skill will review all implemented HTML/CSS and improve visual quality to avoid AI-slop aesthetics.

**Files:** May modify `index.html`, `src/style.css`

- [ ] **Step 1: Invoke the craft skill**

  Run: `/impeccable craft`

  Context: "Dark developer portfolio landing page. Terminal green (#00ff88) accent. Inter for prose, JetBrains Mono for code/tags. All sections now implemented. Goal: ensure it looks like a human designer built this — not an AI. Avoid: over-padded cards, generic gradients, generic shadows, too-bright colors, generic button styles."

- [ ] **Step 2: Review and apply the skill's suggestions**

  Apply improvements to `index.html` and/or `src/style.css`.

- [ ] **Step 3: Verify terminal still works**

  The terminal in the hero should still boot and accept input. Test: type `fayzan help`, confirm output appears.

- [ ] **Step 4: Commit**

  ```bash
  git add -A
  git commit -m "chore: apply impeccable craft — visual quality pass"
  ```

---

## Task 8: Run `/typeset`, `/colorize`, `/animate`, `/layout`

**Purpose:** Sequential refinement passes for typography, colour, animation, and spatial rhythm.

**Files:** May modify `src/style.css`, `index.html`

- [ ] **Step 1: Run `/typeset`**

  Run: `/typeset`
  Apply suggestions. Commit:
  ```bash
  git add -A && git commit -m "chore: apply typeset — typography refinement"
  ```

- [ ] **Step 2: Run `/colorize`**

  Run: `/colorize`
  Apply suggestions. Commit:
  ```bash
  git add -A && git commit -m "chore: apply colorize — color system refinement"
  ```

- [ ] **Step 3: Run `/animate`**

  Run: `/animate`
  Apply suggestions. Commit:
  ```bash
  git add -A && git commit -m "chore: apply animate — motion and micro-interactions refinement"
  ```

- [ ] **Step 4: Run `/layout`**

  Run: `/layout`
  Apply suggestions. Commit:
  ```bash
  git add -A && git commit -m "chore: apply layout — spatial rhythm and alignment pass"
  ```

- [ ] **Step 5: Full browser review after all four passes**

  Check: all sections, all hover states, all scroll animations, mobile layout. Terminal still works. No console errors.

---

## Task 9: Run `/optimize` and `/polish`

**Purpose:** Performance and final quality passes before shipping.

**Files:** May modify `index.html`, `src/style.css`, `public/` assets

- [ ] **Step 1: Run `/optimize`**

  Run: `/optimize`

  Focus areas: headshot image size (should be ≤ 100KB for a 120px display size), CSS property order, font loading strategy, render-blocking resources, layout shift.

  Apply suggestions. Commit:
  ```bash
  git add -A && git commit -m "chore: apply optimize — performance pass"
  ```

- [ ] **Step 2: Run `/polish`**

  Run: `/polish`

  Apply suggestions. Commit:
  ```bash
  git add -A && git commit -m "chore: apply polish — final quality pass"
  ```

- [ ] **Step 3: Final verification checklist**

  - [ ] Page loads without console errors
  - [ ] Terminal boots and accepts input (`fayzan help`, `fayzan projects`, `sudo hire fayzan`)
  - [ ] All nav links smooth-scroll to correct sections
  - [ ] Navbar blurs on scroll
  - [ ] All scroll reveal animations fire on sections, cards, timeline entries
  - [ ] CTA pulse animation visible on `Download Resume` button
  - [ ] Resume PDF downloads on click
  - [ ] All GitHub/npm/live links open in new tab
  - [ ] Mobile layout (≤ 768px): single column, stacked hero, full-width cards
  - [ ] Keyboard navigation works (tab through all interactive elements)
  - [ ] Focus styles visible on all focused elements
  - [ ] `prefers-reduced-motion`: disable in OS settings, reload — no animations should play

- [ ] **Step 4: Final commit**

  ```bash
  git add -A
  git commit -m "feat: landing page complete — all sections, animations, impeccable pipeline applied"
  ```

---

## Summary

| Task | What it produces |
|---|---|
| 1. `/impeccable teach` | Design context established |
| 2. CSS Foundation | Theme vars, overflow fix, scroll reveal system |
| 3. Rebuild `index.html` | Full static HTML for all sections |
| 4. `/shape` | Layout structure reviewed |
| 5. Section CSS | Complete styles for all sections + responsive |
| 6. `src/landing.ts` | Navbar scroll, scroll reveal, smooth scroll |
| 7. `/impeccable craft` | Visual quality pass |
| 8. `/typeset` + `/colorize` + `/animate` + `/layout` | Typography, color, motion, spatial refinement |
| 9. `/optimize` + `/polish` | Performance + final quality |
