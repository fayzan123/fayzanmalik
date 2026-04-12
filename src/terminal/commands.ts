type CommandHandler = (args: string[], flags: string[]) => string | Promise<string>;

interface ParsedCommand {
  base: string;
  subcommand: string;
  args: string[];
  flags: string[];
}

const handlers = new Map<string, CommandHandler>();

export function register(command: string, handler: CommandHandler): void {
  handlers.set(command, handler);
}

export function getRegisteredCommands(): string[] {
  return Array.from(handlers.keys());
}

function parse(raw: string): ParsedCommand {
  const tokens = raw.trim().split(/\s+/);
  const base = tokens[0]?.toLowerCase() ?? '';
  const rest = tokens.slice(1);
  const flags = rest.filter(t => t.startsWith('--'));
  const args = rest.filter(t => !t.startsWith('--'));
  const subcommand = args.shift() ?? '';
  return { base, subcommand, args, flags };
}

export async function execute(raw: string): Promise<string> {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  // Special commands that match the full input string
  const fullMatch = handlers.get(trimmed.toLowerCase());
  if (fullMatch) return fullMatch([], []);

  const { base, subcommand, args, flags } = parse(trimmed);

  // Normalize "fayzan" and "f" to the same namespace
  if (base !== 'fayzan' && base !== 'f') {
    // Check for standalone commands (clear, history)
    const standalone = handlers.get(base);
    if (standalone) return standalone(args, flags);
    return errorMessage(trimmed);
  }

  // Handle flags on the base command
  if (flags.includes('--help') && !subcommand) {
    const helpHandler = handlers.get('help');
    if (helpHandler) return helpHandler([], []);
    return errorMessage(trimmed);
  }

  if (flags.includes('--version') && !subcommand) {
    const versionHandler = handlers.get('version');
    if (versionHandler) return versionHandler([], []);
    return errorMessage(trimmed);
  }

  // No subcommand and no flags = bio
  if (!subcommand && flags.length === 0) {
    const bioHandler = handlers.get('bio');
    if (bioHandler) return bioHandler([], []);
  }

  // Route to subcommand handler
  const handler = handlers.get(subcommand.toLowerCase());
  if (handler) return handler(args, flags);

  return errorMessage(trimmed);
}

function errorMessage(input: string): string {
  const messages = [
    "Hmm, I don't know that one. Try 'fayzan --help' to see what I can do, or use the buttons below.",
    `Not sure what '${escapeHtml(input)}' means — type 'fayzan --help' for a list of commands, or just tap one of the options below.`,
  ];
  return `<span class="text-red">${messages[Math.floor(Math.random() * messages.length)]}</span>`;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
