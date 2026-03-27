import './style.css';
import { Terminal } from './terminal';

const container = document.getElementById('terminal');
if (!container) throw new Error('Missing #terminal container');

const terminal = new Terminal(container);
terminal.print('Terminal loaded. Wiring up commands next...');
terminal.setInteractive(true);
