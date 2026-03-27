import './style.css';
import { Terminal } from './terminal';
import { execute, register } from './commands';
import { registerAllHandlers } from './handlers';

const container = document.getElementById('terminal');
if (!container) throw new Error('Missing #terminal container');

const terminal = new Terminal(container);

// Register all command handlers
registerAllHandlers();

// Special commands that need terminal reference
register('clear', () => {
  terminal.clearOutput();
  return '';
});

register('history', () => {
  const history = terminal.getHistory();
  if (history.length === 0) return '<span class="text-muted">No commands in history.</span>';
  return history.map((cmd, i) => `  <span class="text-muted">${String(i + 1).padStart(4)}</span>  ${cmd}`).join('\n');
});

// Build autocomplete list
const subcommands = ['projects', 'experience', 'skills', 'education', 'contact', 'resume', 'socials'];
const autocompleteList = [
  'fayzan', 'fayzan --help', 'fayzan --version',
  'f', 'f --help', 'f --version',
  ...subcommands.map(s => `fayzan ${s}`),
  ...subcommands.map(s => `f ${s}`),
  'clear', 'history', 'sudo hire fayzan',
];
terminal.setAutocompleteCommands(autocompleteList);

// Wire terminal input to command execution
terminal.onSubmit(async (input: string) => {
  const output = await execute(input);
  if (output) {
    terminal.print(output);
  }
});

// Make interactive immediately (autoplay will be added later)
terminal.setInteractive(true);
terminal.print("Type 'fayzan --help' to get started.");
