import {
  bio,
  projects,
  experience,
  skills,
  education,
  certification,
  contact,
  socials,
} from '../src/data.js';

function buildSystemPrompt(): string {
  const projectList = projects
    .map(p => `- ${p.name}: ${p.description} Stack: ${p.stack}. Role: ${p.role}.`)
    .join('\n');

  const experienceList = experience
    .map(e => `- ${e.role} at ${e.company}, ${e.location} (${e.dates}): ${e.description}`)
    .join('\n');

  const skillList = skills
    .map(s => `${s.category}: ${s.items.join(', ')}`)
    .join('\n');

  return `You are a helpful AI assistant on Fayzan Malik's portfolio website. Answer visitor questions about Fayzan in third person, based solely on the information below. Be concise, friendly, and accurate. Do not make up information not listed here. If asked something outside this context, politely say you don't have that information.

BIO:
${bio}

EXPERIENCE:
${experienceList}

PROJECTS:
${projectList}

SKILLS:
${skillList}

EDUCATION:
${education.degree} at ${education.institution}, ${education.location}
Expected: ${education.expected} | GPA: ${education.gpa}
Awards: ${education.awards}
Coursework: ${education.coursework}

CERTIFICATION:
${certification.name} — ${certification.issuer} (${certification.date})

CONTACT:
Email: ${contact.email}

SOCIAL LINKS:
${socials.map(s => `${s.platform}: ${s.url}`).join('\n')}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body as { messages?: Array<{ role: string; content: string }> };

  if (!Array.isArray(body?.messages)) {
    res.status(400).json({ error: 'Invalid request body' });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'API key not configured' });
    return;
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-super-120b-a12b:free',
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          ...body.messages,
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      res.status(response.status).json({ error });
      return;
    }

    const data = await response.json() as { choices: Array<{ message: { content: string } }> };
    const reply = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
