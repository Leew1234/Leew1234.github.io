// Split-flap hero: letters scramble and settle on each role in turn.
// With reduced motion the first role, already rendered, simply stays put.

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CYCLE_MS = 4000;
const LETTER_MS = 35;

export function startScoreboard(target, controls, roles) {
  if (roles.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const display = document.createElement("span");
  display.setAttribute("aria-hidden", "true");
  display.textContent = roles[0];
  const spoken = document.createElement("span");
  spoken.className = "sr-only";
  spoken.textContent = roles.join(", ");
  target.replaceChildren(display, spoken);

  let index = 0;
  let flip = null;
  let cycle = null;

  function show(text) {
    clearInterval(flip);
    let settled = 0;
    flip = setInterval(() => {
      settled += 1;
      display.textContent = [...text]
        .map((char, i) => (char === " " || i < settled ? char : LETTERS[Math.floor(Math.random() * LETTERS.length)]))
        .join("");
      if (settled >= text.length) clearInterval(flip);
    }, LETTER_MS);
  }

  function next() {
    if (document.hidden) return;
    index = (index + 1) % roles.length;
    show(roles[index]);
  }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "scoreboard-toggle";

  function play() {
    cycle = setInterval(next, CYCLE_MS);
    toggle.textContent = "Pause";
    toggle.setAttribute("aria-label", "Pause role animation");
  }

  function pause() {
    clearInterval(cycle);
    cycle = null;
    clearInterval(flip);
    display.textContent = roles[index];
    toggle.textContent = "Play";
    toggle.setAttribute("aria-label", "Play role animation");
  }

  toggle.addEventListener("click", () => (cycle ? pause() : play()));
  controls.replaceChildren(toggle);
  play();
}
