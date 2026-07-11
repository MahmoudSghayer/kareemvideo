// Timecode helper — ported verbatim from the reference tc().
export function tc(sec: number): string {
  const f = Math.floor((sec % 1) * 24);
  const s = Math.floor(sec) % 60;
  const m = Math.floor(sec / 60) % 60;
  const h = Math.floor(sec / 3600);
  const p = (n: number) => String(n).padStart(2, "0");
  return p(h) + ":" + p(m) + ":" + p(s) + ":" + p(f);
}
