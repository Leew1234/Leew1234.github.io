// The one file to edit when projects or CV entries change.
//
// publicOk: only entries with publicOk: true render on the live site.
// This file is served publicly, so keep unapproved entries out of it entirely.
// They live in drafts/, which is never published.

export const content = {
  site: {
    name: "Wyatt Lee",
    intro: "Computer science student at the University of Michigan.",
    roles: ["Computer Science @ Michigan", "Researcher", "Builder"],
    scoreboard: [
      { label: "Major", value: "CS" },
      { label: "Class", value: "2030" },
      { label: "Field", value: "Ann Arbor" },
    ],
    footer: "Personal site. Not affiliated with or endorsed by the University of Michigan.",
  },

  // Keep publicOk false until the PDF has no phone number (the current copy has one).
  resume: { file: "resume/Wyatt_Lee_Resume.pdf", publicOk: false },

  projects: [
    {
      id: "vertex",
      title: "VERTEX",
      tags: ["Research"],
      oneLiner: "Designed VERTEX to benchmark generative-AI reasoning across 8 dimensions, including diversity, coherence, reasoning depth, and novelty.",
      problem: "",
      myRole: "Independent student researcher, 2023–2025.",
      approach: "A hybrid reasoning framework and scoring pipeline.",
      outcome: "",
      stack: [],
      links: [],
      demo: null,
      publicOk: true,
    },
    {
      id: "calibrated-screening",
      title: "Calibrated AI for cancer screening",
      tags: ["Research"],
      oneLiner: "Evaluated and calibrated a cancer-screening classifier; audited subgroup performance and documented methodology and limitations.",
      problem: "",
      myRole: "Independent student researcher, 2023–2025.",
      approach: "Temperature scaling, decision-curve thresholding, and a subgroup fairness audit.",
      outcome: "", // Add the AUPRC figure only once it's confirmed.
      stack: [],
      links: [],
      demo: null,
      publicOk: true,
    },
  ],

  experience: [
    { type: "Education", org: "University of Michigan, Ann Arbor", role: "LSA, Intended B.S. in Computer Science", dates: "Expected May 2030", bullets: [], publicOk: true },
    { type: "Education", org: "The Bronx High School of Science", role: "Diploma", dates: "2026", bullets: [], publicOk: true },

    { type: "Research", org: "M-STARX, University of Michigan", role: "Biomechanical Optimization Team", dates: "Sep 2026–Present", bullets: ["Develop an in-house dataset combining electromyography (EMG) and inertial measurement unit (IMU) signals to support exoskeleton control and gait analysis.", "Support data organization and movement-protocol research spanning gait, joint motion, and muscle activation."], publicOk: true },
    { type: "Research", org: "Independent Artificial Intelligence Research", role: "Student Researcher", dates: "2023–2025", bullets: ["Designed VERTEX to benchmark generative-AI reasoning across 8 dimensions, including diversity, coherence, reasoning depth, and novelty.", "Evaluated and calibrated a cancer-screening classifier; audited subgroup performance and documented methodology and limitations."], publicOk: true },
    { type: "Research", org: "Mentored Mathematics & AI Research", role: "Student Researcher", dates: "2023–2026", bullets: ["Synthesized research on puzzle-based learning and algorithmic strategies for creative problem-solving in generative AI with faculty mentorship."], publicOk: true },

    { type: "Work", org: "Matthaei Botanical Gardens & Nichols Arboretum, University of Michigan", role: "Student Office Assistant", dates: "Oct 2026–Present", bullets: ["Maintain donation, membership, and transaction records; enter receipt information and update deposit-tracking spreadsheets.", "Assist with financial reconciliation, mail processing, document organization, and other day-to-day administrative operations."], publicOk: true },
    { type: "Work", org: "Global United Marketing Inc.", role: "Logistics / Production Assistant", dates: "Sep 2024–Present", bullets: ["Record and track client orders and contact information, maintaining organized intake documentation and timely order routing.", "Improved order-intake workflow to reduce misfiled requests and streamline administrative processing."], publicOk: true },

    { type: "Leadership", org: "University of Michigan Undergraduate Research Journal", role: "Copy Editor, Natural & Physical Sciences", dates: "2026–Present", bullets: ["Review student research writing for clarity, grammar, consistency, scientific terminology, and citation and formatting conventions."], publicOk: true },
    { type: "Leadership", org: "University of Michigan Club Fencing", role: "Épée Travel Team Member", dates: "2026–Present", bullets: ["Represent the university in intercollegiate club fencing competition."], publicOk: true },
    { type: "Leadership", org: "Code for NYC", role: "Coding & Logistics Director", dates: "2024–2026", bullets: ["Coordinated 15 instructors and programming activities serving 200+ students; taught Python/Java and managed attendance, schedules, and communication."], publicOk: true },
    { type: "Leadership", org: "Math Bulletin, Bronx Science", role: "Editor-in-Chief", dates: "2023–2026", bullets: ["Edited student mathematics articles for accuracy, structure, and citation consistency; managed publication records."], publicOk: true },
    { type: "Leadership", org: "Bronx Science Science Bowl", role: "Co-Founder & Treasurer", dates: "2025–2026", bullets: ["Co-founded chapter and helped grow membership to 95+ students; supported operations and competition preparation."], publicOk: true },
  ],

  honors: ["American Rocketry Challenge National Qualifier (2025)", "New York Math League, Team First Place", "Long Island Math Fair, Silver Medal"],

  skills: [
    { label: "Programming", items: "Python, C++, Java, Git/GitHub" },
    { label: "Office", items: "Microsoft Excel, Word, PowerPoint" },
    { label: "Research", items: "Data organization, model evaluation, statistical analysis, literature review" },
    { label: "Languages", items: "English, Korean" },
  ],

  // Drafted from the CV. Wyatt to approve before launch.
  about:
    "I'm a computer science student at the University of Michigan, expecting to graduate in 2030. My research so far has ranged from building an EMG and IMU dataset for exoskeleton control with M-STARX to independent work benchmarking how generative AI reasons and calibrating a cancer-screening classifier. At the Bronx High School of Science, I edited the Math Bulletin, co-founded the Science Bowl team, and taught Python and Java with Code for NYC. Outside class, I fence épée on Michigan's club team.",

  contact: [
    { label: "Email", value: "wyattlee@umich.edu", href: "mailto:wyattlee@umich.edu", publicOk: true },
    { label: "LinkedIn", value: "linkedin.com/in/wyatt-lee-00b155308", href: "https://www.linkedin.com/in/wyatt-lee-00b155308", publicOk: true },
    { label: "GitHub", value: "github.com/Leew1234", href: "https://github.com/Leew1234", publicOk: true },
  ],
};
