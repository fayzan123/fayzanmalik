import { Terminal } from './terminal';

let hasHired = false;

export async function handleSudoHire(terminal: Terminal): Promise<string> {
  if (hasHired) {
    return '<span class="text-green">You already sent the offer! Check your inbox.</span>';
  }

  hasHired = true;

  const lines = [
    '[sudo] password for recruiter: ********',
    'Verifying credentials...',
    '<span class="text-green">\u2713 Permission granted.</span>',
    'Sending offer letter to fayzanm786@gmail.com...',
    '<span class="text-green">\u2713 Offer sent. Welcome aboard!</span>',
  ];

  const delays = [400, 800, 400, 600, 400];

  for (let i = 0; i < lines.length; i++) {
    terminal.print(lines[i]);
    if (i === lines.length - 1) {
      launchConfetti();
    }
    await new Promise(r => setTimeout(r, delays[i]));
  }

  return '';
}

function launchConfetti(): void {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
  }

  const particles: Particle[] = [];
  const colors = ['#ff5f57', '#febc2e', '#28c840', '#56b6c2', '#e06c75', '#c678dd'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 3 + 2,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      opacity: 1,
    });
  }

  const startTime = Date.now();
  const duration = 3000;

  function animate() {
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fadeStart = duration - 1000;
    const globalOpacity = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / 1000 : 1;

    for (const p of particles) {
      p.x += p.vx;
      p.vy += 0.1;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.globalAlpha = globalOpacity * p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
