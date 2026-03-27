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
    // Build DOM structure
    const window = document.createElement('div');
    window.className = 'terminal-window';

    // Title bar
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

    // Output area
    this.outputEl = document.createElement('div');
    this.outputEl.className = 'terminal-output';
    window.appendChild(this.outputEl);

    // Input line
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

    // Navigation chips
    this.chipsEl = document.createElement('div');
    this.chipsEl.className = 'chips hidden';
    window.appendChild(this.chipsEl);

    container.appendChild(window);
  }

  print(html: string): void {
    const line = document.createElement('div');
    line.className = 'output-line';
    line.innerHTML = html;
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
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
      this.inputEl.focus();
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
    this.print(`<span class="prompt">$ </span><span class="input-echo">${command}</span>`);
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
        this.print(`<span class="prompt">$ </span><span class="input-echo">${input}</span>`);
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

    // Keep focus on input when clicking anywhere in the terminal
    document.querySelector('.terminal-window')?.addEventListener('click', () => {
      this.inputEl.focus();
    });
  }
}
