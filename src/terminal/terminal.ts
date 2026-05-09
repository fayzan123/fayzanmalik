function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export class Terminal {
  private outputEl: HTMLElement;
  private inputEl: HTMLElement;
  private promptEl: HTMLElement;
  private chipsEl: HTMLElement;
  private commandHistory: string[] = [];
  private historyIndex = -1;
  private submitCallback: ((input: string) => void) | null = null;
  private autocompleteCommands: string[] = [];

  constructor(container: HTMLElement) {
    const window = document.createElement('div');
    window.className = 'terminal-window';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `
      <div class="title-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <span class="title-text">fayzan@portfolio: ~</span>
    `;
    window.appendChild(titleBar);

    this.outputEl = document.createElement('div');
    this.outputEl.className = 'terminal-output';
    window.appendChild(this.outputEl);

    this.promptEl = document.createElement('div');
    this.promptEl.className = 'input-line hidden';
    this.promptEl.innerHTML = '<span class="prompt">$ </span>';
    this.inputEl = document.createElement('span');
    this.inputEl.className = 'input-text';
    this.inputEl.setAttribute('contenteditable', 'true');
    this.inputEl.setAttribute('spellcheck', 'false');
    this.inputEl.setAttribute('autocapitalize', 'none');
    this.inputEl.setAttribute('autocomplete', 'off');
    this.inputEl.setAttribute('autocorrect', 'off');
    this.promptEl.appendChild(this.inputEl);
    window.appendChild(this.promptEl);

    this.chipsEl = document.createElement('div');
    this.chipsEl.className = 'chips hidden';
    window.appendChild(this.chipsEl);

    container.appendChild(window);
  }

  print(html: string): void {
    const line = document.createElement('div');
    line.className = 'output-line';
    line.innerHTML = html;
    line.querySelectorAll<HTMLAnchorElement>('a[data-command]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const cmd = link.dataset.command;
        if (cmd) this.executeCommand(cmd);
      });
    });
    line.querySelectorAll<HTMLAnchorElement>('a.detail-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const entry = toggle.closest('.project-entry');
        const content = entry?.querySelector('.detail-content');
        if (!content) return;
        const isHidden = content.classList.contains('hidden');
        content.classList.toggle('hidden');
        toggle.textContent = isHidden ? '▼ Less details' : '▶ More details';
      });
    });
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  confirm(prompt: string): Promise<boolean> {
    return new Promise((resolve) => {
      let selected = 0; // 0 = Yes, 1 = No
      let resolved = false;

      // Hide normal input
      this.promptEl.classList.add('hidden');

      // Build the confirm UI
      const container = document.createElement('div');
      container.className = 'output-line confirm-prompt';

      const label = document.createElement('span');
      label.textContent = prompt + ' ';
      container.appendChild(label);

      const options = document.createElement('span');
      options.className = 'confirm-options';

      const yesEl = document.createElement('span');
      yesEl.className = 'confirm-option confirm-selected';
      yesEl.textContent = 'Yes';

      const separator = document.createElement('span');
      separator.className = 'text-muted';
      separator.textContent = ' / ';

      const noEl = document.createElement('span');
      noEl.className = 'confirm-option';
      noEl.textContent = 'No';

      options.appendChild(yesEl);
      options.appendChild(separator);
      options.appendChild(noEl);
      container.appendChild(options);

      this.outputEl.appendChild(container);
      this.scrollToBottom();

      const render = () => {
        yesEl.className = selected === 0 ? 'confirm-option confirm-selected' : 'confirm-option';
        noEl.className = selected === 1 ? 'confirm-option confirm-selected' : 'confirm-option';
      };

      const finish = (result: boolean) => {
        if (resolved) return;
        resolved = true;
        document.removeEventListener('keydown', keyHandler);
        // Show final state
        container.innerHTML = `${escapeHtml(prompt)} <span class="${result ? 'text-green' : 'text-muted'}">${result ? 'Yes' : 'No'}</span>`;
        // Restore normal input
        this.promptEl.classList.remove('hidden');
        this.inputEl.focus();
        resolve(result);
      };

      const keyHandler = (e: KeyboardEvent) => {
        if (resolved) return;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          selected = 0;
          render();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          selected = 1;
          render();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          finish(selected === 0);
        } else if (e.key === 'y' || e.key === 'Y') {
          e.preventDefault();
          finish(true);
        } else if (e.key === 'n' || e.key === 'N' || e.key === 'Escape') {
          e.preventDefault();
          finish(false);
        }
      };

      document.addEventListener('keydown', keyHandler);

      // Click support
      yesEl.addEventListener('click', () => finish(true));
      noEl.addEventListener('click', () => finish(false));
    });
  }

  async printTyped(text: string, speed = 60): Promise<void> {
    const line = document.createElement('div');
    line.className = 'output-line';
    this.outputEl.appendChild(line);
    for (const char of text) {
      line.textContent += char;
      this.outputEl.scrollTop = this.outputEl.scrollHeight;
      await new Promise(r => setTimeout(r, speed + Math.random() * 30));
    }
  }

  getInput(): string {
    return this.inputEl.textContent?.trim() ?? '';
  }

  setInput(text: string): void {
    this.inputEl.textContent = text;
  }

  clearInput(): void {
    this.inputEl.textContent = '';
  }

  clearOutput(): void {
    this.outputEl.innerHTML = '';
  }

  focus(): void {
    this.inputEl.focus();
  }

  setInteractive(enabled: boolean): void {
    if (enabled) {
      this.promptEl.classList.remove('hidden');
      this.attachKeyListeners();
    } else {
      this.promptEl.classList.add('hidden');
    }
  }

  showChips(): void {
    this.chipsEl.classList.remove('hidden');
    this.chipsEl.classList.add('fade-in');
  }

  onSubmit(callback: (input: string) => void): void {
    this.submitCallback = callback;
  }

  addChip(label: string, command: string): void {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = label;
    chip.addEventListener('click', () => {
      this.executeCommand(command);
    });
    this.chipsEl.appendChild(chip);
  }

  getHistory(): string[] {
    return [...this.commandHistory];
  }

  getOutputEl(): HTMLElement {
    return this.outputEl;
  }

  setAutocompleteCommands(commands: string[]): void {
    this.autocompleteCommands = commands;
  }

  scrollToBottom(): void {
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  private executeCommand(command: string): void {
    this.print(`<span class="prompt">$ </span><span class="input-echo">${escapeHtml(command)}</span>`);
    this.commandHistory.push(command);
    this.historyIndex = -1;
    if (this.submitCallback) {
      this.submitCallback(command);
    }
  }

  private attachKeyListeners(): void {
    this.inputEl.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;

      if (ke.key === 'Enter') {
        ke.preventDefault();
        const input = this.getInput();
        if (!input) return;
        this.print(`<span class="prompt">$ </span><span class="input-echo">${escapeHtml(input)}</span>`);
        this.commandHistory.push(input);
        this.historyIndex = -1;
        this.clearInput();
        if (this.submitCallback) {
          this.submitCallback(input);
        }
      }

      if (ke.key === 'ArrowUp') {
        ke.preventDefault();
        if (this.commandHistory.length === 0) return;
        if (this.historyIndex === -1) {
          this.historyIndex = this.commandHistory.length - 1;
        } else if (this.historyIndex > 0) {
          this.historyIndex--;
        }
        this.setInput(this.commandHistory[this.historyIndex]);
      }

      if (ke.key === 'ArrowDown') {
        ke.preventDefault();
        if (this.historyIndex === -1) return;
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.setInput(this.commandHistory[this.historyIndex]);
        } else {
          this.historyIndex = -1;
          this.clearInput();
        }
      }

      if (ke.key === 'Tab') {
        ke.preventDefault();
        const current = this.getInput().trim().toLowerCase();
        if (!current) return;

        const matches = this.autocompleteCommands.filter(c => c.startsWith(current));

        if (matches.length === 1) {
          this.setInput(matches[0]);
        } else if (matches.length > 1) {
          this.print(`<span class="text-muted">${matches.join('  ')}</span>`);
        }
      }
    });

    // Keep focus on input when clicking anywhere in the terminal, except links
    // Skip if user has selected text (so copy works)
    // Skip on mobile — programmatic focus triggers iOS Safari zoom
    document.querySelector('.terminal-window')?.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('.confirm-prompt')) return;
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) return;
      if (window.matchMedia('(max-width: 768px)').matches) return;
      this.inputEl.focus();
    });
  }
}
