import './style.css';
import { Terminal } from './terminal';
import { execute } from './commands';
import { registerAllHandlers } from './handlers';

const container = document.getElementById('terminal');
if (!container) throw new Error('Missing #terminal container');

const terminal = new Terminal(container);

// Register all command handlers
registerAllHandlers();

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
