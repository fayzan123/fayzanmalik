export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  stack: string;
  role: string;
  github?: string;
  npm?: string;
  live?: string;
  devpost?: string;
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

export interface Program {
  name: string;
  detail: string;
  location: string;
  date: string;
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

export const bio = "Hey, I'm Fayzan — a Computer Science student at Western University who builds open-source AI developer tooling. My CLIs (Claude Workflow Composer, rungraph, context-audit) have passed 13,000+ npm downloads combined. I'm a Product Engineer Intern at Dayforce on the Strategic Workforce Planning team (formerly Agentnoon, YC W22), I lead agentic AI at Western AI, and I attended Y Combinator's Startup School in San Francisco.";

export const projects: Project[] = [
  {
    slug: 'rungraph',
    name: 'rungraph',
    oneLiner: 'Ask your agent what happened, watch the graph answer. A zero-setup visualizer that turns Claude Code, Codex, Cursor, Hermes, and OpenCode transcripts into an interactive run graph your agent can query over an 8-tool MCP server. 3,900+ npm downloads and 26 GitHub stars.',
    description: 'npx rungraph reconstructs Claude Code sessions and multi-agent workflow runs from the transcripts already on your disk into an interactive directed graph: orchestrator, subagents, and tools as nodes, spawn/return edges, decision lineage, and the moments a human said no marked on the path. Runs in progress grow live via file watching. Five adapters cover Claude Code, Codex, Hermes Agent, opencode, and Cursor. It also ships an agent-first surface: a --json intermediate representation and an MCP server with eight tools, so your agent can query the same graph and light up the exact nodes its answer is about. No hooks, no wrappers, no telemetry. About 20,000 lines of JavaScript with a Vitest suite and GitHub Actions CI. 3,900+ npm downloads and 26 GitHub stars since launching in August 2026.',
    stack: 'JavaScript, Node.js, Preact, ELK.js, MCP',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/rungraph',
    npm: 'https://www.npmjs.com/package/rungraph',
    live: 'https://fayzan123.github.io/rungraph/',
  },
  {
    slug: 'claude-workflow-composer',
    name: 'Claude Workflow Composer',
    oneLiner: 'n8n for Claude Code — a visual desktop app for composing multi-agent workflows without touching a single YAML file. 5,800+ npm downloads and 37 GitHub stars.',
    description: 'Built a visual workflow composer for Claude Code multi-agent pipelines. Run npx claude-cwc and a canvas opens in your browser: drag agents onto it, wire handoffs with trigger conditions, assign skills and a model per agent, and export a fully working orchestrator skill directly into your Claude installation. Repeated-action detection mines your real Claude Code usage history and proposes workflows from the patterns it finds. The exporter writes agent .md files and a skill with disable-model-invocation: true via BFS traversal of the node graph into natural-language steps, with conflict detection via ownership comments and a full file preview before writing anything. TypeScript end to end with 97 Vitest test files and GitHub Actions CI. 5,800+ npm downloads and 37 GitHub stars.',
    stack: 'TypeScript, React, React Flow, Express, Vite, Vitest',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/claude-workflow-composer',
    npm: 'https://www.npmjs.com/package/claude-cwc',
  },
  {
    slug: 'lazarus',
    name: 'Lazarus',
    oneLiner: 'Winner at HackPrinceton — an autonomous AI swarm that resurrects failed clinical trials into executive-ready drug repurposing plans.',
    description: 'Built an autonomous multi-agent AI system that mines failed and terminated clinical trials from ClinicalTrials.gov, PubMed, and openFDA, then runs each candidate through a coordinated adversarial pipeline: an Advocate proposes an alternative disease indication, a Skeptic challenges it for safety conflicts, an Evidence Curator validates citations against real PubMed IDs, a Trial Strategist estimates feasibility and ROI, and a Judge synthesizes a final confidence-scored recommendation. The output is a full executive-ready R&D blueprint PDF with decision-maker notifications via iMessage. Won the Regeneron AI & Tech for Clinical Trials track at HackPrinceton Spring 2026, competing against 400+ hackers and 100+ teams.',
    stack: 'Python, FastAPI, PostgreSQL, Neo4j, Redis, React, GPT-4o, Gemini, Docker, WebSocket',
    role: 'Co-builder (team of 4)',
    github: 'https://github.com/farhanmir/lazarus',
    devpost: 'https://devpost.com/software/lazarus-91k3tz',
  },
  {
    slug: 'flash-flood',
    name: 'Flash Flood',
    oneLiner: 'Browserbase track finalist at Hack the North 2026 — AI personas stress-test a website in parallel cloud browsers and file evidence-backed bug reports.',
    description: 'Built at Hack the North 2026 (University of Waterloo) with a team of 3. Flash Flood launches a crowd of AI personas against a website, each driving its own Browserbase cloud browser in parallel, and turns what they hit into evidence-backed bug reports with screenshots and steps. I built the session engine that orchestrates the parallel browser sessions and the live agent wall that streams every persona as it works. Made the final pitching round of the Browserbase track.',
    stack: 'TypeScript, Next.js, Node.js, SQLite, Browserbase',
    role: 'Co-builder (team of 3)',
    github: 'https://github.com/xsachax/flash-flood_hack-the-north-2026',
    devpost: 'https://devpost.com/software/flashflood',
  },
  {
    slug: 'annotake',
    name: 'Annotake',
    oneLiner: 'Show your coding agent exactly what happened. A macOS menu-bar app inspired by Wispr Flow: double-tap a key, click through the bug in any app, and drag one captioned screenshot per step into Claude Code, Cursor, or ChatGPT.',
    description: 'A notarized macOS menu-bar app for handing UI bugs to AI coding agents. Double-tap a hotkey (Right Command by default), click through the flow in any app, and double-tap again. Annotake keeps one frame per step by pixel diffing, captions each click from the macOS Accessibility tree (for example, Clicked button "Save"), and shows a floating card you drag straight into Claude Code, Cursor, or ChatGPT. Native Swift on ScreenCaptureKit and the Accessibility API. Built for my own bug reproductions at work; free during the beta at annotake.app.',
    stack: 'Swift, ScreenCaptureKit, macOS Accessibility API',
    role: 'Solo developer',
    live: 'https://annotake.app',
  },
  {
    slug: 'agency-agents',
    name: 'agency-agents (Open Source Contribution)',
    oneLiner: 'Merged a LinkedIn Content Creator agent into agency-agents, formerly the #1 trending repo on GitHub (155,000+ stars).',
    description: 'Contributed a LinkedIn Content Creator agent to agency-agents (PR #129), the #1 trending repository on GitHub at the time and now at 155,000+ stars. Studied existing agents to match the format exactly, built the agent with real templates, tested it on a live use case, and navigated the full fork → branch → PR workflow. The agent handles LinkedIn thought leadership content strategy, post drafting, and audience engagement workflows.',
    stack: 'Bash, Claude, GitHub',
    role: 'Open source contributor',
    github: 'https://github.com/msitarzewski/agency-agents/pull/129',
  },
  {
    slug: 'context-audit',
    name: 'context-audit',
    oneLiner: 'The dashboard for your AI coding agent’s skills: what they cost per session, what actually fires, what’s dead weight, and what’s dangerous. Works across Claude Code, Codex, Cursor, and AGENTS.md. 2,000+ npm downloads.',
    description: 'A zero-dependency TypeScript CLI and local dashboard that audits AI coding agents’ instruction files across Claude Code, Codex, Cursor, and the cross-tool AGENTS.md standard. It measures token cost per session, which skills have never fired according to your own transcript history, which ones Claude Code silently drops from its listing budget, and which are dangerous. The rule the whole project is held to: it never judges, it measures. A 26-check security engine normalizes Unicode and zero-width characters before matching and catches hidden instructions, exfiltration sinks, download-and-execute patterns, and permission weakening, validated against a regression corpus of nine documented real-world attack shapes. Ships with a companion skill so you can just ask your agent “what is my context costing?”. 2,000+ npm downloads.',
    stack: 'TypeScript, Node.js, CLI Tooling, node:http',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/context-audit',
    npm: 'https://www.npmjs.com/package/context-audit',
  },
  {
    slug: 'skillet',
    name: 'skillet',
    oneLiner: 'Your skills are making your model dumber. A 16-line Claude Code skill that finds over-specified skills and reduces them to intent.',
    description: 'skillet scans a Claude Code skills directory for over-specified skills (thousand-line process scripts, rigid checklists, MUST/NEVER theater) and reduces them to lean, intent-level versions that keep the constraints that matter and drop the scaffolding. The thesis: on frontier models, scripting the model’s behavior replaces strong reasoning with mediocre procedure. The whole tool is about 16 lines of markdown. Born from a real scan of my own machine (76 skills, roughly 569,000 tokens of instructions) and a real reduction: a 371-line market-discovery skill cut to 16 lines with every invariant intact. Sibling to context-audit, which measures; skillet fixes.',
    stack: 'Claude Code, Markdown',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/skillet',
  },
  {
    slug: 'ghostline',
    name: 'Ghostline',
    oneLiner: 'Automated lead generation pipeline that discovers, scores, and outreaches AI agent developers on GitHub, generating 100+ high-intent leads.',
    description: 'Built an end-to-end sales pipeline for an early-stage AI infrastructure startup that runs 16 targeted GitHub searches daily to find Python developers building production AI agents with LangChain, LangGraph, and CrewAI. Each repo is scored 0–100 across tool use, production maturity, social proof, and developer profile signals. Qualified leads are exported to Google Sheets with inferred pain points. A LangGraph-powered outreach agent then fetches each repo\'s README, generates a personalized 150-word cold email via Claude, and presents every draft in a terminal review UI — no email is sent without founder approval. Achieves ~92% email extraction rate and ~45 qualified leads per daily run, generating 100+ high-intent leads.',
    stack: 'Python, LangGraph, GitHub API, Google Sheets API, Anthropic Claude, SQLite, Gmail SMTP, cron',
    role: 'Solo builder',
    github: 'https://github.com/fayzan123/ghostline',
  },
  {
    slug: 'claude-check',
    name: 'claude-check',
    oneLiner: 'A CLI tool with 900+ downloads that scores your prompt before you send it to Claude.',
    description: "An npm CLI with 900+ downloads that analyses any Claude prompt for complexity, estimates how many messages it'll take, assesses interrupt risk, and returns a safe/caution/do-not-start verdict. It checks your real-time claude.ai usage so you don't burn your limit on a task that'll get cut off halfway.",
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
    slug: 'clearcare',
    name: 'ClearCare',
    oneLiner: 'A rural healthcare referral platform that could save $15,000+ per avoided airlift.',
    description: 'Built a closed-loop rural referral platform with AI voice follow-ups (Vapi), SMS alerts (Twilio), and escalation workflows designed to reduce emergency transfer frequency and potentially avoid $15,000+ per airlift case.',
    stack: 'React, TypeScript, FastAPI, PostgreSQL, Vapi, Twilio',
    role: 'Team member',
    github: 'https://github.com/Deogan7/ClearCare',
  },
  {
    slug: 'claude-skills',
    name: 'Claude Skills',
    oneLiner: 'Published Claude skills for reusable context handoff and evidence-backed product analysis.',
    description: 'Built and published context transport, a Claude skill for reusable context handoff across workflows. Built and published brutal analysis, a Claude skill that performs evidence-backed product and market analysis via live competitive research and outputs build/pivot/kill recommendations.',
    stack: 'Claude, Markdown',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/brutal-analysis',
  },
  {
    slug: 'binary-tree',
    name: 'Binary Tree Traversal Practice Tool',
    oneLiner: 'A gamified platform used by 100+ students for practicing binary tree traversals.',
    description: 'A React-based educational tool that helps students practice preorder, inorder, and postorder binary tree traversals. Features randomly generated trees, real-time visual feedback, and has been used by 100+ students.',
    stack: 'React, JavaScript, Firebase, Gemini, OpenAI',
    role: 'Solo developer',
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
    role: 'Product Engineer Intern',
    company: 'Dayforce',
    location: 'Toronto, ON (Hybrid)',
    dates: 'September 2026 – April 2027',
    description: 'Strategic Workforce Planning team, formerly Agentnoon (YC W22). Built a formula editor with nested IF/THEN logic so one formula assigns values across employee groups. Tested against 250,000-employee org models on a platform serving 7,000+ enterprises and 7.6M+ employees.',
  },
  {
    role: 'Vice President, Head of Agentic AI',
    company: 'Western AI, Western University',
    location: 'London, ON',
    dates: 'September 2026 – Present',
    description: 'Led agentic AI for Western AI’s 2,000+ student community. Founded the Western Agentic Development Club in March 2026, which merged into Western AI.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'ICARO Media Group',
    location: 'Thornhill, ON',
    dates: 'July 2025 – September 2025',
    description: 'Provisioned an AWS EC2 Linux server and deployed a PHP web app on Apache backed by a MySQL database. Built a Flask employee management app with GET and POST endpoints to create, read, and update MySQL records, debugging HTTP requests and responses with Postman, curl, and browser DevTools.',
  },
];

export const skills: SkillCategory[] = [
  { category: 'Languages', items: ['TypeScript', 'Python', 'Go', 'Java', 'C', 'JavaScript', 'SQL', 'Bash', 'HTML/CSS', 'R'] },
  { category: 'AI Agents & Harnesses', items: ['Claude Code', 'OpenAI Codex', 'Gemini', 'Hermes Agent', 'OpenClaw', 'OpenCode', 'Qwen Code', 'Command Code', 'Cursor', 'n8n'] },
  { category: 'AI Frameworks & Models', items: ['MCP (Model Context Protocol)', 'LangGraph', 'LangChain', 'Langfuse', 'CrewAI', 'AutoGen', 'Claude API', 'DeepSeek', 'Kimi', 'GLM', 'Nano Banana', 'LLMs', 'embeddings', 'RAG', 'model evaluation', 'multi-agent systems', 'prompt engineering'] },
  { category: 'Infrastructure', items: ['Node.js', 'Docker', 'Linux', 'PostgreSQL', 'MySQL', 'Redis', 'Neo4j', 'SQLite', 'AWS', 'Firebase', 'Supabase', 'Git', 'GitHub Actions', 'WebSockets', 'Sentry', 'Grafana', 'SonarQube'] },
  { category: 'Frameworks & Libraries', items: ['React', 'Next.js', 'Vue', 'FastAPI', 'Flask', 'Tailwind CSS', 'Vite', 'Vitest', 'NumPy', 'Pandas', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Matplotlib', 'Seaborn'] },
];

export const education: Education = {
  degree: 'Honours Specialization in Computer Science (HBSc), Co-op',
  institution: 'Western University',
  location: 'London, ON',
  expected: 'April 2028',
  gpa: '3.8',
  awards: 'Western Admission Scholarship; Dean’s Honor List 2023, 2024, 2025, 2026',
  coursework: 'Data Structures and Algorithms, Machine Learning, Databases, Statistics, Operating Systems, Software Engineering',
};

export const program: Program = {
  name: 'Y Combinator Startup School 2026',
  detail: 'Attendee — in-person founder program, selected from 30,000+ applicants',
  location: 'San Francisco, CA',
  date: 'July 2026',
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
  { platform: 'Twitter', url: 'https://x.com/fayzanm05' },
];

export const version = 'fayzan-portfolio v4.1.0';
