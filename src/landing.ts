// landing.ts - all non-terminal page behaviour
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

interface ProjectDetail {
  label: string;
  name: string;
  body: string;
  links: { label: string; url: string }[];
}

const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  'agency-agents': {
    label: 'Open Source Contribution',
    name: 'agency-agents',
    body: `I contributed a LinkedIn Content Creator agent to agency-agents - the #1 trending repository on GitHub at the time, with over 65,000 stars. The agent automates LinkedIn content creation by analyzing a given topic, drafting an engaging post optimized for the LinkedIn algorithm, and outputting it in a format ready to publish.\n\nThe contribution involved writing a clean, composable Bash-based agent script that integrates with Claude via the Claude CLI, following the project's conventions for agent structure and prompt design. The PR was reviewed and merged by the maintainer.`,
    links: [
      { label: 'GitHub →', url: 'https://github.com/msitarzewski/agency-agents' },
    ],
  },
  'claude-check': {
    label: 'CLI Tool · npm Package',
    name: 'claude-check',
    body: `claude-check is a command-line tool that evaluates your prompt before you send it to Claude. It scores the prompt across dimensions like clarity, specificity, and context richness, then gives actionable feedback on how to improve it.\n\nBuilt with Node.js and TypeScript, it calls the Anthropic API using a meta-prompt to assess the input prompt, then returns a structured score and suggestions. It has 650+ downloads on npm and is used by developers who want to get better results from Claude without trial-and-error iteration.`,
    links: [
      { label: 'GitHub →', url: 'https://github.com/fayzan123/claude-check' },
      { label: 'npm →', url: 'https://www.npmjs.com/package/claude-check' },
    ],
  },
  'thisthenthat': {
    label: 'Full Stack · AI App',
    name: 'ThisThenThat',
    body: `ThisThenThat is a web app for students who feel overwhelmed by complex assignments. You upload your assignment PDF and the app uses Claude to break it down into a clear, ordered sequence of steps - a game plan tailored to your specific task.\n\nEach step comes with its own AI chat interface, so you can ask questions, get clarification, or brainstorm ideas in the context of exactly where you are in the assignment. Built with Next.js, TypeScript, Supabase for auth and storage, and the Claude API for both the plan generation and per-step chat.`,
    links: [
      { label: 'GitHub →', url: 'https://github.com/fayzan123/thisthenthat' },
      { label: 'Live →', url: 'https://thisthenthat.vercel.app' },
    ],
  },
  'clearcare': {
    label: 'Hackathon Project · Healthcare',
    name: 'ClearCare',
    body: `ClearCare is a rural healthcare referral platform built at a hackathon to address one of the most expensive problems in Canadian healthcare: unnecessary medical airlifts. A single airlift can cost $15,000 or more - many of which could be avoided with better real-time coordination between rural clinics and regional hospitals.\n\nThe platform lets rural healthcare providers quickly assess patient transfer options, check specialist availability, and initiate referrals with AI-assisted triage support. It uses a React + TypeScript frontend, a FastAPI backend with PostgreSQL, Vapi for AI voice triage calls, and Twilio for SMS-based coordination. I led backend development and API integration.`,
    links: [
      { label: 'GitHub →', url: 'https://github.com/Deogan7/ClearCare' },
    ],
  },
  'chox-ai': {
    label: 'AI Safety · Co-Founder & CTO',
    name: 'Chox AI',
    body: `Chox AI is a governance layer for AI agents - an HTTP proxy that sits between your agents and the external APIs they call. Every outbound request is intercepted, classified, and risk-scored before being forwarded or blocked.\n\nThe core is a Go-based proxy that extracts action type and argument signals from each API call, then runs it through a classification pipeline: read, write, delete, or financial operation. High-risk actions are logged as shadow verdicts before enforcement is enabled, letting you audit agent behavior without disrupting workflows.\n\nI built the full Go backend, the proxy infrastructure, and the React dashboard for visualizing audit logs and configuring governance rules. The dashboard lets you set allow/block/escalate policies per action type and monitor agent activity in real time.`,
    links: [
      { label: 'GitHub →', url: 'https://github.com/fayzan123/chox-ai' },
    ],
  },
  'claude-skills': {
    label: 'AI Tooling · Prompt Engineering',
    name: 'Claude Skills',
    body: `I published a set of Claude skills - reusable prompt modules that can be invoked inside Claude Code sessions to provide structured, repeatable behavior. The two main skills I published are a context-transport skill for exporting and importing project context across repositories, and a brutal-product-analysis skill for evidence-backed evaluation of whether an idea is worth building.\n\nSkills are written in Markdown with frontmatter metadata and follow conventions for how Claude Code loads and executes them. They're designed to be composable, shareable, and easy to drop into any project.`,
    links: [
      { label: 'GitHub →', url: 'https://github.com/fayzan123/claude-skills' },
    ],
  },
  'binary-tree': {
    label: 'EdTech · Web App',
    name: 'Binary Tree Traversal Practice Tool',
    body: `A gamified platform for Computer Science students to practice binary tree traversals - inorder, preorder, and postorder. Students are shown a binary tree and have to correctly identify the traversal sequence, with immediate feedback and scoring.\n\nThe platform integrates Gemini and OpenAI to generate dynamic explanations when a student gets an answer wrong, explaining where their logic broke down. It uses Firebase for auth and real-time leaderboard data. Over 100 students have used it to prepare for DS&A exams and coding interviews.`,
    links: [
      { label: 'Live →', url: 'https://binarytreelearner.net' },
    ],
  },
  'titanic': {
    label: 'Machine Learning · Data Science',
    name: 'Titanic Survival Prediction',
    body: `A data science project that benchmarks multiple machine learning models against the classic Titanic survival dataset. The goal was to compare model architectures - Logistic Regression, Random Forest, Gradient Boosting, and a TensorFlow neural net - across accuracy, precision, recall, and AUC.\n\nThe project involved full EDA with Seaborn and Matplotlib, feature engineering (extracting title from name, encoding cabin class, handling missingness), and a clean evaluation pipeline built with Scikit-learn. It served as a rigorous introduction to the ML workflow and the tradeoffs between model complexity and interpretability.`,
    links: [
      { label: 'GitHub →', url: 'https://github.com/fayzan123/Titanic-Survival-Prediction' },
    ],
  },
};

function initProjectModal(): void {
  const overlay = document.getElementById('project-modal') as HTMLElement;
  if (!overlay) return;

  const titleEl = document.getElementById('modal-title')!;
  const labelEl = document.getElementById('modal-label')!;
  const tagsEl = document.getElementById('modal-tags')!;
  const bodyEl = document.getElementById('modal-body')!;
  const linksEl = document.getElementById('modal-links')!;
  const closeBtn = document.getElementById('modal-close')!;

  function openModal(projectId: string): void {
    const data = PROJECT_DETAILS[projectId];
    if (!data) return;

    labelEl.textContent = data.label;
    titleEl.textContent = data.name;

    // Populate tags from the card
    const card = document.querySelector<HTMLElement>(`[data-project-id="${projectId}"]`);
    tagsEl.innerHTML = '';
    card?.querySelectorAll('.tag').forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag.textContent;
      tagsEl.appendChild(span);
    });

    // Body
    bodyEl.innerHTML = data.body
      .split('\n\n')
      .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
      .join('');

    // Links
    linksEl.innerHTML = '';
    data.links.forEach(({ label, url }) => {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'modal-link';
      a.textContent = label;
      linksEl.appendChild(a);
    });

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => overlay.classList.add('modal-visible'));
  }

  function closeModal(): void {
    overlay.classList.remove('modal-visible');
    document.body.style.overflow = '';
    overlay.addEventListener('transitionend', () => {
      overlay.hidden = true;
    }, { once: true });
  }

  document.querySelectorAll<HTMLElement>('.project-card[data-project-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal when clicking a link inside the card
      if ((e.target as HTMLElement).closest('a')) return;
      const id = card.dataset.projectId!;
      openModal(id);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });
}

function initCursorBloom(): void {
  const bloom = document.querySelector<HTMLElement>('.page-bloom');
  if (!bloom) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const bloomEl = bloom;
  let targetX = 20;
  let targetY = 40;
  let currentX = 20;
  let currentY = 40;

  document.addEventListener('mousemove', (e: MouseEvent) => {
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
  }, { passive: true });

  function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  function tick(): void {
    currentX = lerp(currentX, targetX, 0.04);
    currentY = lerp(currentY, targetY, 0.04);
    bloomEl.style.setProperty('--bloom-x', `${currentX.toFixed(2)}%`);
    bloomEl.style.setProperty('--bloom-y', `${currentY.toFixed(2)}%`);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initGrain(): void {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const TILE = 256;
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-grain';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.width = TILE;
  canvas.height = TILE;

  // Insert behind all hero content
  hero.insertBefore(canvas, hero.firstChild);

  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(TILE, TILE);
  const data = imageData.data;

  let frame = 0;
  let rafId: number;

  function drawGrain(): void {
    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function tick(): void {
    if (frame % 4 === 0) drawGrain(); // ~15fps
    frame++;
    rafId = requestAnimationFrame(tick);
  }

  const heroEl = hero;
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { rafId = requestAnimationFrame(tick); }
    else { cancelAnimationFrame(rafId); }
  });
  io.observe(heroEl);
}

// Module scripts are deferred - DOM is already parsed at this point.
// Do NOT use DOMContentLoaded here; it may have already fired.
initNavbar();
initScrollReveal();
initSmoothScroll();
initProjectModal();
initCursorBloom();
initGrain();