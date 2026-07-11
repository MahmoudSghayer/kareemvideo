// Tiny replay signal so Hero can reveal its masked lines only after the loader
// finishes (mirrors the reference done() → revealHero() sequencing), without a
// mount-order race between the two sibling components.
let done = false;
const subs = new Set<() => void>();

export const loaderSignal = {
  get: () => done,
  fire: () => {
    if (done) return;
    done = true;
    subs.forEach((f) => f());
  },
  subscribe: (f: () => void) => {
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  },
};
