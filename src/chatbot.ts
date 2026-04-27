interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const history: Message[] = [];

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
  if (isOpen) input.focus();
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
  history.push({ role: 'user', content: text });

  const typing = appendTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });

    const data = await res.json() as { reply?: string };
    typing.remove();

    if (res.ok && data.reply) {
      appendMessage('bot', data.reply);
      history.push({ role: 'assistant', content: data.reply });
    } else {
      appendMessage('bot', 'Sorry, something went wrong. Please try again.');
    }
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
