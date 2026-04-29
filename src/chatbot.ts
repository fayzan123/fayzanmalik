interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_INPUT_LENGTH = 600;
const MAX_HISTORY_MESSAGES = 20;
const MIN_SEND_INTERVAL_MS = 800;

const chatHistory: Message[] = [];
let lastSendAt = 0;

function getEl<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element #${id} not found`);
  return el as T;
}

const panel    = getEl<HTMLDivElement>('chatbot-panel');
const toggle   = getEl<HTMLButtonElement>('chatbot-toggle');
const closeBtn = getEl<HTMLButtonElement>('chatbot-close');
const messages = getEl<HTMLDivElement>('chatbot-messages');
const input    = getEl<HTMLInputElement>('chatbot-input');
const sendBtn  = getEl<HTMLButtonElement>('chatbot-send');

let isOpen = false;

function toggleChat(): void {
  isOpen = !isOpen;
  panel.classList.toggle('is-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      panel.animate(
        [
          { transform: 'scale(0.93) translateY(12px)', opacity: '0', offset: 0 },
          { transform: 'scale(1.015) translateY(-2px)', opacity: '1', offset: 0.55 },
          { transform: 'scale(0.995) translateY(1px)', opacity: '1', offset: 0.75 },
          { transform: 'scale(1) translateY(0)', opacity: '1', offset: 1 },
        ],
        { duration: 420, easing: 'ease-out', fill: 'forwards' }
      );
    }
    input.focus();
  }
}

toggle.addEventListener('click', toggleChat);
closeBtn.addEventListener('click', toggleChat);

function appendMessage(role: 'user' | 'bot', text: string): void {
  const wrapper = document.createElement('div');
  wrapper.className = `chatbot-message ${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'chatbot-bubble';
  bubble.textContent = text;
  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

function appendTyping(): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'chatbot-message bot chatbot-typing';
  wrapper.innerHTML = '<div class="chatbot-bubble"><span></span><span></span><span></span></div>';
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
  return wrapper;
}

async function sendMessage(): Promise<void> {
  if (sendBtn.disabled) return;

  const now = Date.now();
  if (now - lastSendAt < MIN_SEND_INTERVAL_MS) return;

  const rawText = input.value.trim();
  if (!rawText) return;
  const text = rawText.slice(0, MAX_INPUT_LENGTH);

  lastSendAt = now;
  input.value = '';
  sendBtn.disabled = true;
  input.disabled = true;

  appendMessage('user', text);
  chatHistory.push({ role: 'user', content: text });
  if (chatHistory.length > MAX_HISTORY_MESSAGES) {
    chatHistory.splice(0, chatHistory.length - MAX_HISTORY_MESSAGES);
  }

  const typing = appendTyping();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 25_000);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory }),
      signal: controller.signal,
    });

    typing.remove();

    let reply = '';
    let parsed: { reply?: string; error?: string } | null = null;
    try {
      parsed = await res.json() as { reply?: string; error?: string };
    } catch { /* non-JSON response */ }

    if (parsed?.reply) {
      reply = parsed.reply;
      if (res.ok) {
        chatHistory.push({ role: 'assistant', content: reply });
      }
    } else if (res.status === 429) {
      reply = "You're sending messages too fast. Please slow down a moment.";
    } else if (res.status === 400) {
      reply = "I couldn't process that message. Try rephrasing it.";
    } else {
      reply = 'Sorry, something went wrong. Please try again.';
    }

    appendMessage('bot', reply);
  } catch (err) {
    typing.remove();
    const aborted = (err as { name?: string })?.name === 'AbortError';
    appendMessage(
      'bot',
      aborted
        ? 'That took too long. Please try again.'
        : "Sorry, I'm having trouble connecting. Please try again.",
    );
  } finally {
    window.clearTimeout(timeout);
    sendBtn.disabled = false;
    input.disabled = false;
    input.focus();
  }
}

sendBtn.addEventListener('click', () => { void sendMessage(); });
input.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    void sendMessage();
  }
});
