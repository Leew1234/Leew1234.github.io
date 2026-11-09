import { content } from "../../data/content.js";
import { render } from "./render.js";
import { startScoreboard } from "./scoreboard.js";
import { startGoBlue } from "./goblue.js";

// Draft entries can be previewed only from a local server, with ?preview in the URL.
const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
const preview = isLocal && new URLSearchParams(location.search).has("preview");

render(content, { preview });
startScoreboard(document.getElementById("hero-role"), document.getElementById("scoreboard-controls"), content.site.roles);
startGoBlue();

// Mark the nav link for whichever section is in the middle of the screen.
const navLinks = [...document.querySelectorAll(".site-nav nav a")];
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries.filter((item) => item.isIntersecting)) {
      for (const link of navLinks) {
        if (link.getAttribute("href") === `#${entry.target.id}`) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      }
    }
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
