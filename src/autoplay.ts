import { Terminal } from './terminal';

export async function runAutoplay(terminal: Terminal): Promise<void> {
  let skipped = false;

  const skipHandler = () => {
    skipped = true;
  };

  document.addEventListener('click', skipHandler, { once: true });
  document.addEventListener('keydown', skipHandler, { once: true });

  const delay = (ms: number) =>
    new Promise<void>(resolve => {
      if (skipped) return resolve();
      setTimeout(resolve, ms);
    });

  // Step 1: Type the install command
  if (!skipped) {
    await terminal.printTyped('$ npm install fayzan-portfolio', 60);
  }

  await delay(300);

  if (skipped) {
    cleanup();
    printFinalState(terminal);
    return;
  }

  // Step 2: Install animation
  terminal.print('');
  terminal.print('<span class="text-muted">Resolving dependencies...</span>');
  await delay(600);

  // Progress bar animation
  const barLength = 24;
  const progressLine = document.createElement('div');
  progressLine.className = 'output-line';
  terminal.getOutputEl().appendChild(progressLine);

  for (let i = 0; i <= barLength; i++) {
    if (skipped) break;
    const filled = '\u2588'.repeat(i);
    const empty = '\u2591'.repeat(barLength - i);
    const pct = Math.round((i / barLength) * 100);
    progressLine.textContent = `[${filled}${empty}] ${pct}%`;
    terminal.scrollToBottom();
    await delay(80);
  }

  if (skipped) {
    cleanup();
    printFinalState(terminal);
    return;
  }

  await delay(200);
  terminal.print('<span class="text-muted">added 1 package, audited 1 package in 2.4s</span>');
  await delay(400);
  terminal.print('');
  terminal.print('<span class="text-green">\u2713 fayzan-portfolio@1.0.0 installed successfully</span>');
  await delay(300);
  terminal.print('');
  terminal.print("Type 'fayzan --help' to get started.");

  cleanup();

  function cleanup() {
    document.removeEventListener('click', skipHandler);
    document.removeEventListener('keydown', skipHandler);
  }
}

function printFinalState(terminal: Terminal): void {
  terminal.clearOutput();
  const block = '\u2588';
  terminal.print('<span class="text-muted">$ npm install fayzan-portfolio</span>');
  terminal.print('');
  terminal.print('<span class="text-muted">Resolving dependencies...</span>');
  terminal.print(`[${block.repeat(24)}] 100%`);
  terminal.print('<span class="text-muted">added 1 package, audited 1 package in 2.4s</span>');
  terminal.print('');
  terminal.print('<span class="text-green">\u2713 fayzan-portfolio@1.0.0 installed successfully</span>');
  terminal.print('');
  terminal.print("Type 'fayzan --help' to get started.");
}
