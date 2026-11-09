// Builds the page from data/content.js. Uses text nodes only, so content is never parsed as HTML.

function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === "class") el.className = value;
    else el.setAttribute(key, value);
  }
  el.append(...children.flat().filter((child) => child !== null && child !== undefined));
  return el;
}

const isTodo = (text) => typeof text === "string" && text.startsWith("TODO");

function text(tag, value, className = "") {
  const classes = [className, isTodo(value) ? "todo" : ""].filter(Boolean).join(" ");
  return h(tag, classes ? { class: classes } : {}, value);
}

function draftBadge(item) {
  return item.publicOk ? null : h("span", { class: "badge" }, "Draft: hidden on live site");
}

function field(label, value) {
  if (!value) return null;
  return h("div", { class: "field" }, h("dt", {}, label), text("dd", value));
}

function projectCard(project) {
  return h(
    "article",
    { class: "card", id: `card-${project.id}` },
    draftBadge(project),
    h("ul", { class: "chips", "aria-label": "Tags" }, [...project.tags, ...(project.demo ? ["Interactive demo"] : [])].map((tag) => h("li", {}, tag))),
    h("h3", {}, project.title),
    text("p", project.oneLiner),
    project.stack.length ? h("p", { class: "card-stack" }, project.stack.join(" · ")) : null,
    h("a", { class: "card-link", href: `#project/${project.id}`, "aria-label": `View details: ${project.title}` }, "View details")
  );
}

function panelContent(project) {
  return [
    draftBadge(project),
    h("ul", { class: "chips", "aria-label": "Tags" }, project.tags.map((tag) => h("li", {}, tag))),
    h("h2", { id: "panel-title" }, project.title),
    text("p", project.oneLiner),
    h(
      "dl",
      {},
      field("Problem", project.problem),
      field("My role", project.myRole),
      field("Approach", project.approach),
      field("Outcome", project.outcome),
      field("Stack", project.stack.join(", "))
    ),
    project.links.length ? h("ul", {}, project.links.map((link) => h("li", {}, h("a", { href: link.href }, link.label)))) : null,
    project.demo && DEMOS[project.demo] ? h("div", { class: "demo-slot" }) : null,
  ];
}

// Register a demo here once its project is public, e.g. genome: () => import("./demos/genome.js").
// Finished demos waiting on approval are kept in drafts/.
const DEMOS = {};

// Opens the panel for #project/<id>. Only visible projects can open, so a deep
// link to a hidden draft does nothing on the live site.
function setupProjectPanel(projects) {
  const panel = document.getElementById("project-panel");
  const body = document.getElementById("panel-content");
  const projectFromHash = () => projects.find((project) => `#project/${project.id}` === location.hash);
  let openId = null;
  let stopDemo = null;

  function endDemo() {
    stopDemo?.();
    stopDemo = null;
  }

  // Demos load separately, so a failure leaves the written content intact.
  async function startDemo(project) {
    const slot = body.querySelector(".demo-slot");
    if (!slot) return;
    const demo = h("div", { class: "demo" });
    slot.append(demo);
    try {
      const module = await DEMOS[project.demo]();
      if (openId !== project.id || !demo.isConnected) return;
      stopDemo = module.mount(demo) ?? null;
    } catch {
      demo.replaceChildren(h("p", {}, "This demo couldn't load. The project description above is unaffected."));
    }
  }

  function sync() {
    const project = projectFromHash();
    if (project) {
      endDemo();
      openId = project.id;
      body.replaceChildren(...panelContent(project).filter(Boolean));
      if (!panel.open) panel.showModal();
      panel.scrollTop = 0;
      startDemo(project);
    } else if (panel.open) {
      closePanel();
    }
  }

  // Safe to call twice: the close event can follow a closePanel() call.
  function afterClose() {
    if (openId === null) return;
    endDemo();
    const card = document.getElementById(`card-${openId}`);
    openId = null;
    // Swap the entry rather than add one, so Back leaves the page instead of reopening the panel.
    if (location.hash.startsWith("#project/")) history.replaceState(null, "", "#projects");
    if (card && !card.hidden) card.querySelector(".card-link").focus();
  }

  function closePanel() {
    panel.close();
    afterClose();
  }

  panel.addEventListener("cancel", (event) => {
    event.preventDefault();
    closePanel();
  });
  panel.addEventListener("close", afterClose);
  panel.querySelector(".panel-close").addEventListener("click", closePanel);
  panel.addEventListener("click", (event) => {
    if (event.target === panel) closePanel();
  });
  window.addEventListener("hashchange", sync);
  sync();
}

// Builds filter buttons for a rendered list. Filters with no matching items are left out.
function setupFilter({ barId, statusId, list, labels, noun, tagsOf }) {
  const bar = document.getElementById(barId);
  const status = document.getElementById(statusId);
  const items = list.map(({ element, item }) => ({ element, tags: tagsOf(item) }));
  const available = ["All", ...labels.filter((label) => items.some(({ tags }) => tags.includes(label)))];
  // Hide the filter when there's nothing to choose between (all items share one category).
  if (items.length < 2 || available.length < 3) {
    bar.replaceChildren();
    status.textContent = "";
    return;
  }

  const buttons = available.map((label) => h("button", { type: "button", class: "filter", "aria-pressed": String(label === "All") }, label));

  function apply(label) {
    let shown = 0;
    for (const { element, tags } of items) {
      element.hidden = !(label === "All" || tags.includes(label));
      if (!element.hidden) shown += 1;
    }
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.textContent === label)));
    status.textContent = `Showing ${shown} ${shown === 1 ? noun : noun.replace(/y$/, "ie") + "s"}`;
  }

  buttons.forEach((button) => button.addEventListener("click", () => apply(button.textContent)));
  bar.replaceChildren(...buttons);
  apply("All");
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function monthNumber(part, defaultMonth) {
  const year = Number(part.match(/\d{4}/)?.[0] ?? 0);
  const month = MONTHS.indexOf(part.match(/[a-z]{3}(?= \d{4})/i)?.[0].toLowerCase());
  return year * 12 + (month >= 0 ? month : defaultMonth);
}

// Reads date strings like "Sep 2024–Present", "2023–2026", or "Expected May 2030".
function dateRange(dates) {
  const [from, to = from] = dates.split("–");
  return {
    start: monthNumber(from, 0),
    end: /present|expected/i.test(dates) ? Infinity : monthNumber(to, 11),
  };
}

function newestFirst(a, b) {
  const [first, second] = [dateRange(a.dates), dateRange(b.dates)];
  return first.end === second.end ? second.start - first.start : second.end - first.end;
}

function experienceRow(entry) {
  return h(
    "li",
    { class: "entry" },
    h("p", { class: "entry-when" }, h("span", {}, entry.dates), h("span", { class: "entry-type" }, entry.type)),
    h(
      "div",
      { class: "entry-body" },
      draftBadge(entry),
      h("h3", {}, entry.org),
      h("p", { class: "entry-role" }, entry.role),
      entry.bullets.length ? h("ul", {}, entry.bullets.map((bullet) => h("li", {}, bullet))) : null
    )
  );
}

export function render(content, { preview = false } = {}) {
  const visible = (items) => items.filter((item) => item.publicOk || preview);
  const set = (id, ...children) => document.getElementById(id).replaceChildren(...children.flat());

  set("hero-name", content.site.name);
  set("hero-intro", content.site.intro);
  const role = content.site.roles[0];
  set("hero-role", isTodo(role) ? text("span", role) : role);
  set(
    "hero-stats",
    content.site.scoreboard.map((stat) => h("div", { class: "stat" }, h("dt", {}, stat.label), h("dd", {}, stat.value)))
  );

  const heroActions = [h("a", { class: "button", href: "#projects" }, "View Projects")];
  const showResume = content.resume.publicOk || preview;
  if (showResume) heroActions.push(h("a", { class: "button button-alt", href: content.resume.file }, "Resume"));
  set("hero-actions", heroActions);

  const projects = visible(content.projects);
  const projectElements = projects.map((item) => ({ item, element: projectCard(item) }));
  set("project-list", projects.length ? projectElements.map(({ element }) => element) : h("p", {}, "Projects coming soon."));
  setupFilter({
    barId: "project-filters",
    statusId: "project-status",
    list: projectElements,
    labels: ["Research", "Hardware", "Software"],
    noun: "project",
    tagsOf: (project) => project.tags,
  });
  setupProjectPanel(projects);

  const experienceElements = [...visible(content.experience)].sort(newestFirst).map((item) => ({ item, element: experienceRow(item) }));
  set("experience-list", experienceElements.map(({ element }) => element));
  setupFilter({
    barId: "experience-filters",
    statusId: "experience-status",
    list: experienceElements,
    labels: ["Research", "Work", "Leadership"],
    noun: "entry",
    tagsOf: (entry) => [entry.type],
  });
  set("honors-list", content.honors.map((honor) => h("li", {}, honor)));
  set(
    "skills-list",
    content.skills.map((skill) => h("div", { class: "field" }, h("dt", {}, skill.label), h("dd", {}, skill.items)))
  );
  set("resume-link", showResume ? h("a", { class: "button", href: content.resume.file, download: "" }, "Download resume (PDF)") : []);

  set("about-text", text("p", content.about));
  set(
    "contact-list",
    visible(content.contact).map((item) =>
      h("li", {}, h("span", { class: "contact-label" }, item.label), h("a", { href: item.href }, item.value))
    )
  );
  set("footer-text", content.site.footer);

  if (preview) document.body.prepend(h("p", { class: "preview-bar" }, "Local preview: showing entries hidden on the live site."));
}
