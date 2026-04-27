interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const chatHistory: Message[] = [];

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
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  sendBtn.disabled = true;
  input.disabled = true;

  appendMessage('user', text);
  chatHistory.push({ role: 'user', content: text });

  const typing = appendTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory }),
    });

    typing.remove();

    let reply = 'Sorry, something went wrong. Please try again.';
    if (res.ok) {
      try {
        const data = await res.json() as { reply?: string };
        if (data.reply) {
          reply = data.reply;
          chatHistory.push({ role: 'assistant', content: data.reply });
        }
      } catch { /* non-JSON response */ }
    }
    appendMessage('bot', reply);
  } catch {
    typing.remove();
    appendMessage('bot', "Sorry, I'm having trouble connecting. Please try again.");
  } finally {
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
