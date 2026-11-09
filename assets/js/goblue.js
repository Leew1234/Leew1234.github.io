// Easter egg: typing "goblue" drops maize confetti.
// To remove it, delete this file and the two goblue lines in main.js.

const WORD = "goblue";

function confetti() {
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = "position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:50";
  document.body.append(layer);

  for (let i = 0; i < 60; i += 1) {
    const piece = document.createElement("span");
    piece.style.cssText = `position:absolute;top:-20px;left:${Math.random() * 100}%;width:8px;height:14px;background:#ffcb05`;
    layer.append(piece);
    piece.animate(
      [{ transform: "translateY(0) rotate(0)" }, { transform: `translateY(110vh) rotate(${Math.random() * 720}deg)` }],
      { duration: 1200 + Math.random() * 800, delay: Math.random() * 300, easing: "ease-in", fill: "both" }
    );
  }
  setTimeout(() => layer.remove(), 2400);
}

export function startGoBlue() {
  let typed = "";
  document.addEventListener("keydown", (event) => {
    if (event.target.closest("input, textarea, select, [contenteditable]")) return;
    typed = (typed + event.key.toLowerCase()).slice(-WORD.length);
    if (typed === WORD && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typed = "";
      confetti();
    }
  });
}
