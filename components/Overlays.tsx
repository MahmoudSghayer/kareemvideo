// Film grain (SVG turbulence, screen blend ~5%) + inset vignette — fixed above all.
// Ported verbatim from the reference overlay divs.

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function Overlays() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: "-50%",
          zIndex: 9990,
          pointerEvents: "none",
          opacity: 0.05,
          mixBlendMode: "screen",
          backgroundImage: GRAIN,
          animation: "grainShift 1.1s steps(2) infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9991,
          pointerEvents: "none",
          boxShadow: "inset 0 0 220px 40px rgba(0,0,0,.85)",
        }}
      />
    </>
  );
}
