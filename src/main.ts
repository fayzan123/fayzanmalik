import './style.css';
import { Terminal } from './terminal';
import { execute, register } from './commands';
import { registerAllHandlers } from './handlers';
import { runAutoplay } from './autoplay';
import { handleSudoHire } from './easter-eggs';

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

// Easter egg commands
register('sudo hire fayzan', async () => {
  return await handleSudoHire(terminal);
});

register('sudo', () => {
  return "Nice try. But the only command I'll sudo is 'sudo hire fayzan'.";
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

// Set up navigation chips
const chipCommands = [
  { label: 'help', command: 'fayzan --help' },
  { label: 'projects', command: 'fayzan projects' },
  { label: 'experience', command: 'fayzan experience' },
  { label: 'skills', command: 'fayzan skills' },
  { label: 'contact', command: 'fayzan contact' },
  { label: 'resume', command: 'fayzan resume' },
];
chipCommands.forEach(({ label, command }) => terminal.addChip(label, command));

// Boot sequence: run autoplay, then enable interactive mode
async function boot() {
  await runAutoplay(terminal);
  terminal.setInteractive(true);
  terminal.showChips();
}
boot();
