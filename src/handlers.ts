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
      `<span class="text-cyan">${escapeHtml(exp.role)}</span> @ ${escapeHtml(exp.company)}
<span class="text-muted">${escapeHtml(exp.location)} | ${escapeHtml(exp.dates)}</span>
${escapeHtml(exp.description)}
`).join('\n');
  });

  register('skills', () => {
    return data.skills.map(cat =>
      `<span class="text-cyan">${escapeHtml(cat.category)}</span>
  ${cat.items.map(item => `[${escapeHtml(item)}]`).join(' ')}`
    ).join('\n\n');
  });

  register('education', () => {
    const edu = data.education;
    const cert = data.certification;
    return `<span class="text-cyan">${escapeHtml(edu.degree)}</span>
${escapeHtml(edu.institution)} — ${escapeHtml(edu.location)}
Expected Graduation: ${escapeHtml(edu.expected)}
GPA: ${escapeHtml(edu.gpa)}
Awards: ${escapeHtml(edu.awards)}
Coursework: ${escapeHtml(edu.coursework)}

<span class="text-cyan">${escapeHtml(cert.name)}</span>
${escapeHtml(cert.issuer)} — ${escapeHtml(cert.date)}`;
  });

  register('contact', () => {
    return `<span class="text-cyan">Email:</span>    <a href="mailto:${data.contact.email}">${escapeHtml(data.contact.email)}</a>
<span class="text-cyan">Phone:</span>    <a href="tel:${data.contact.phone}">${escapeHtml(data.contact.phone)}</a>
<span class="text-cyan">Status:</span>   ${escapeHtml(data.contact.citizenship)}`;
  });

  register('resume', () => {
    const link = document.createElement('a');
    link.href = '/fayzan-resume.pdf';
    link.download = 'fayzan-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return `Downloading resume...
<span class="text-green">✓ fayzan-resume.pdf saved.</span>`;
  });

  register('socials', () => {
    return data.socials.map(s =>
      `<span class="text-cyan">${escapeHtml(s.platform)}:</span>  <a href="${s.url}" target="_blank" rel="noopener">${s.url}</a>`
    ).join('\n');
  });
}

function projectList(): string {
  return data.projects.map(p => {
    return `<span class="text-cyan">${escapeHtml(p.name)}</span>  <span class="text-muted">${escapeHtml(p.stack)}</span>
  ${escapeHtml(p.oneLiner)}
  <span class="text-muted">GitHub:</span> ${p.github}`;
  }).join('\n\n');
}

function projectDetail(slug: string): string {
  const project = data.projects.find(
    p => p.slug.toLowerCase() === slug.toLowerCase() || p.name.toLowerCase() === slug.toLowerCase()
  );
  if (!project) {
    return `<span class="text-red">Project '${escapeHtml(slug)}' not found. Run 'f projects' to see available projects.</span>`;
  }

  let output = `<span class="text-cyan">${escapeHtml(project.name)}</span>
${escapeHtml(project.description)}

<span class="text-muted">Stack:</span>  ${escapeHtml(project.stack)}
<span class="text-muted">Role:</span>   ${escapeHtml(project.role)}
<span class="text-muted">GitHub:</span> <a href="${project.github}" target="_blank" rel="noopener">${project.github}</a>`;

  if (project.npm) {
    output += `\n<span class="text-muted">npm:</span>    <a href="${project.npm}" target="_blank" rel="noopener">${project.npm}</a>`;
  }
  if (project.live) {
    output += `\n<span class="text-muted">Live:</span>   <a href="${project.live}" target="_blank" rel="noopener">${project.live}</a>`;
  }

  return output;
}
