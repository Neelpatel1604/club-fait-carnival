const COLORS = ["#FF9900", "#2EC4B6", "#FF4D6D", "#9B5DE5", "#FFD23F"];

export function burstConfetti(x: number, y: number, count: number) {
  if (typeof document === "undefined") return;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    el.style.left = `${x + (Math.random() * 160 - 80)}px`;
    el.style.top = `${y - 10}px`;
    el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    const duration = 1.6 + Math.random() * 1.2;
    el.style.animation = `confettiFall ${duration}s ease-in forwards`;
    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), duration * 1000 + 100);
  }
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
