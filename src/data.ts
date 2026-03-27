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
  { platform: 'Twitter', url: 'https://x.com/fayzanm05' },
];

export const version = 'fayzan-portfolio v3.8.0';
