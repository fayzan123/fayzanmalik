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
    slug: 'lazarus',
    name: 'Lazarus',
    oneLiner: 'Top 10 at HackPrinceton — an autonomous AI swarm that resurrects failed clinical trials into executive-ready drug repurposing plans.',
    description: 'Built an autonomous multi-agent AI system that mines failed and terminated clinical trials from ClinicalTrials.gov, PubMed, and openFDA, then runs each candidate through a coordinated adversarial pipeline: an Advocate proposes an alternative disease indication, a Skeptic challenges it for safety conflicts, an Evidence Curator validates citations against real PubMed IDs, a Trial Strategist estimates feasibility and ROI, and a Judge synthesizes a final confidence-scored recommendation. The output is a full executive-ready R&D blueprint PDF with decision-maker notifications via iMessage. Placed Top 10 under the Regeneron AI & Tech for Clinical Trials track at HackPrinceton Spring 2026, competing against 400+ hackers and 100+ teams.',
    stack: 'Python, FastAPI, PostgreSQL, Neo4j, Redis, React, GPT-4o, Gemini, Docker, WebSocket',
    role: 'Co-builder (team of 4)',
    github: 'https://github.com/farhanmir/lazarus',
    devpost: 'https://devpost.com/software/lazarus-91k3tz',
  },
  {
    slug: 'agency-agents',
    name: 'agency-agents (Open Source Contribution)',
    oneLiner: 'Merged a LinkedIn Content Creator agent into the #1 trending GitHub repo (65,000+ stars).',
    description: 'Contributed a LinkedIn Content Creator agent to agency-agents (PR #129), the #1 trending repository on GitHub at the time with 65,000+ stars. Studied existing agents to match the format exactly, built the agent with real templates, tested it on a live use case, and navigated the full fork → branch → PR workflow. The agent handles LinkedIn thought leadership content strategy, post drafting, and audience engagement workflows.',
    stack: 'Bash, Claude, GitHub',
    role: 'Open source contributor',
    github: 'https://github.com/msitarzewski/agency-agents/pull/129',
  },
  {
    slug: 'ghostline',
    name: 'Ghostline',
    oneLiner: 'Automated lead generation pipeline that discovers, scores, and outreaches AI agent developers on GitHub — Chox\'s go-to-market engine.',
    description: 'Built an end-to-end sales pipeline for Chox that runs 16 targeted GitHub searches daily to find Python developers building production AI agents with LangChain, LangGraph, and CrewAI. Each repo is scored 0–100 across tool use, production maturity, social proof, and developer profile signals. Qualified leads are exported to Google Sheets with inferred pain points. A LangGraph-powered outreach agent then fetches each repo\'s README, generates a personalized 150-word cold email via Claude, and presents every draft in a terminal review UI — no email is sent without founder approval. Achieves ~92% email extraction rate and ~45 qualified leads per daily run.',
    stack: 'Python, LangGraph, GitHub API, Google Sheets API, Anthropic Claude, SQLite, Gmail SMTP, cron',
    role: 'Solo builder (co-founder)',
    github: 'https://github.com/fayzan123/ghostline',
  },
  {
    slug: 'claude-check',
    name: 'claude-check',
    oneLiner: 'A CLI tool with 650+ downloads that scores your prompt before you send it to Claude.',
    description: "An npm CLI with 650+ downloads that analyses any Claude prompt for complexity, estimates how many messages it'll take, assesses interrupt risk, and returns a safe/caution/do-not-start verdict. It checks your real-time claude.ai usage so you don't burn your limit on a task that'll get cut off halfway.",
    stack: 'Node.js, TypeScript, Anthropic API, CLI Tooling',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/claude-check',
    npm: 'https://www.npmjs.com/package/claude-check',
  },
  {
    slug: 'claude-workflow-composer',
    name: 'Claude Workflow Composer',
    oneLiner: 'n8n for Claude Code — a visual desktop app for composing multi-agent workflows without touching a single YAML file.',
    description: 'Built a visual workflow composer for Claude Code multi-agent pipelines. Drag agents onto a canvas, wire handoffs with trigger conditions, attach skills, and export a fully working orchestrator skill directly into your Claude installation. The exporter writes agent .md files and a skill with disable-model-invocation: true via BFS traversal of the node graph into natural-language steps. Includes conflict detection via ownership comments, reference vs bespoke node distinction, full file preview before writing anything, and 89 tests across 16 files. Run with npx claude-cwc — no code signing, no friction.',
    stack: 'TypeScript, React, React Flow, Express, Vite, Vitest',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/claude-workflow-composer',
    npm: 'https://www.npmjs.com/package/claude-cwc',
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
    slug: 'chox-ai',
    name: 'Chox AI',
    oneLiner: 'An AI agent governance layer that classifies and risk-scores tool calls in real time.',
    description: 'Built an AI agent governance layer that classifies and risk-scores agent tool calls, logs shadow verdicts (allow/block/escalate), and provides proxy and SDK integrations for policy enforcement.',
    stack: 'Go, React, TypeScript, PostgreSQL, Docker',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/chox-ai',
  },
  {
    slug: 'claude-skills',
    name: 'Claude Skills',
    oneLiner: 'Published Claude skills for reusable context handoff and evidence-backed product analysis.',
    description: 'Built and published context transport, a Claude skill for reusable context handoff across workflows. Built and published brutal analysis, a Claude skill that performs evidence-backed product and market analysis via live competitive research and outputs build/pivot/kill recommendations.',
    stack: 'Claude, Markdown',
    role: 'Solo developer',
    github: 'https://github.com/fayzan123/claude-skills',
  },
  {
    slug: 'binary-tree',
    name: 'Binary Tree Traversal Practice Tool',
    oneLiner: 'A gamified platform used by 100+ students for practicing binary tree traversals.',
    description: 'A React-based educational tool that helps students practice preorder, inorder, and postorder binary tree traversals. Features randomly generated trees, real-time visual feedback, and has been used by 100+ students.',
    stack: 'React, JavaScript, Firebase, Gemini, OpenAI',
    role: 'Solo developer',
    github: 'https://binarytreelearner.net',
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
    role: 'Co-Founder & CTO',
    company: 'Chox AI',
    location: 'Remote',
    dates: 'January 2026 \u2013 Present',
    description: 'Built a Go HTTP proxy that sits between AI agents and external APIs, intercepting requests to classify actions, extract structured signals, and enforce governance policies before forwarding traffic. Implemented an argument-aware risk scoring and shadow-verdict pipeline for agent tool calls, classifying actions such as read, write, delete, and financial operations before enforcement is enabled. Developed the core Go backend and React dashboard for monitoring high-risk API actions, audit logs, and rule-based governance across developer-built AI agents.',
  },
  {
    role: 'President & Founder',
    company: 'Western Agentic Development Club, Western University',
    location: 'London, ON',
    dates: 'March 2026 \u2013 Present',
    description: 'Founded and currently lead a student-run agentic AI community for computer science students at Western University. Organize workshops, hackathons, and networking events on autonomous agent development using n8n, LangGraph, and MCP-based workflows. Oversee club-led projects where members collaborate across teams to build and ship practical AI agent solutions.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'ICARO Media Group',
    location: 'Thornhill, ON',
    dates: 'July 2025 \u2013 September 2025',
    description: 'Refactored and upgraded LAMP-based web applications, reducing production friction across internal workflows. Standardized AWS EC2 development environments for 5+ developers, improving release reliability and test consistency. Built Flask REST APIs and resolved latency bottlenecks via profiling, improving median API response time by 15% under peak load.',
  },
];

export const skills: SkillCategory[] = [
  { category: 'Languages', items: ['Python', 'Java', 'C', 'Go', 'TypeScript', 'JavaScript', 'SQL', 'HTML/CSS', 'R', 'Bash'] },
  { category: 'Frameworks & Libraries', items: ['React', 'Flask', 'Next.js', 'FastAPI', 'Node.js', 'Tailwind CSS', 'WebSocket', 'NumPy', 'Pandas', 'Matplotlib', 'TensorFlow', 'Scikit-learn', 'PyTorch', 'Seaborn'] },
  { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'Neo4j', 'Redis'] },
  { category: 'AI / LLM', items: ['Codex', 'Claude Code', 'Gemini', 'OpenAI', 'OpenClaw', 'Nano Banana', 'LangGraph', 'CrewAI', 'AutoGen', 'MCP', 'prompt engineering', 'AI agent governance', 'model evaluation'] },
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
  { platform: 'Twitter', url: 'https://x.com/fayzanm05' },
];

export const version = 'fayzan-portfolio v3.8.0';
