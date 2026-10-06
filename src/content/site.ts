// Single source of truth for Strive's content. Every section renders from
// this file, so adding a profession, a journal piece or a link is a data
// change rather than a redesign.

export const links = {
  // Replace with the live URLs before launch.
  substack: "#journal",
  linkedin: "#about",
  contact: "#contact",
  offers: "#specifics",
};

export const nav = [
  { href: "#model", label: "The Strive Model" },
  { href: "#specifics", label: "Strive Specifics" },
  { href: "#journal", label: "Journal" },
  { href: "#about", label: "About" },
];

export type Layer = {
  slug: string;
  number: string;
  title: string;
  age: string;
  summary: string;
  questions: string[];
  image: string;
  alt: string;
};

// The five layers are a permanent part of the brand architecture.
export const layers: Layer[] = [
  {
    slug: "decision",
    number: "01",
    title: "The Decision Layer",
    age: "Ages 16–18",
    summary:
      "Informed career decisions before choosing a direction: understanding interests, strengths and the real shape of different paths.",
    questions: ["Which subjects keep doors open?", "What do these careers involve day to day?", "How do I choose a course?"],
    image: "/images/layer-decision.jpg",
    alt: "A student sitting on stone steps outside a college building, reading notes",
  },
  {
    slug: "build",
    number: "02",
    title: "The Build Layer",
    age: "Ages 18–25",
    summary:
      "Turning direction into education, experience, skills and opportunity, so that the first years count for more.",
    questions: ["Which experience matters most?", "How do I find a first role?", "When does a postgraduate degree make sense?"],
    image: "/images/layer-build.jpg",
    alt: "Hands writing in a notebook",
  },
  {
    slug: "skill",
    number: "03",
    title: "The Skill Layer",
    age: "Ages 25–35",
    summary:
      "The professional skills, visibility and career assets that allow good work to be seen and a career to compound.",
    questions: ["Which skills should I invest in?", "How do I become more visible?", "What should my portfolio show?"],
    image: "/images/layer-skill.jpg",
    alt: "A participant taking notes at a workshop table",
  },
  {
    slug: "specifics",
    number: "04",
    title: "The Specifics",
    age: "Any stage",
    summary:
      "Deep dives into a single profession through workshops, webinars, resources and guidance from people who work in it.",
    questions: ["How does this field really work?", "What do employers look for?", "Where are the opportunities?"],
    image: "/images/layer-specifics.jpg",
    alt: "Archival photograph of a scientist working at a microscope",
  },
  {
    slug: "transition",
    number: "05",
    title: "The Transition Layer",
    age: "Ages 40+",
    summary:
      "Career change, reinvention and the considered question of what comes next, approached with evidence rather than impulse.",
    questions: ["Is it time for a change?", "Which of my skills transfer?", "How do I move without starting over?"],
    image: "/images/layer-transition.jpg",
    alt: "A woman reading by a window with a cup of coffee",
  },
];

export const principles = [
  {
    title: "Grounded in psychology",
    text: "Strive is built on career psychology: the study of how people choose work, adapt to it and find meaning in it over time.",
  },
  {
    title: "Organised by stage",
    text: "The questions at seventeen are not the questions at forty. Guidance is structured around where someone actually is.",
  },
  {
    title: "Specific to a profession",
    text: "General advice only goes so far. Each Strive Specific goes deep on one field, starting with Psychology and Research.",
  },
];

export type Specific = {
  id: string;
  title: string;
  text: string;
  includes: string[];
  cta: string;
  /** Point at the vertical's own page once it exists. */
  href: string;
  image: string;
  alt: string;
};

// Launch verticals. Append an entry to add a profession.
export const specifics: Specific[] = [
  {
    id: "psychology",
    title: "Psychology",
    text: "Career paths, opportunities and professional growth for students and practitioners building a life in psychology.",
    includes: ["Routes into practice and training", "Clinical, organisational and academic paths", "Applications and interviews"],
    cta: "Explore Psychology",
    href: "#specifics",
    image: "/images/specific-psychology.jpg",
    alt: "A man reading a book in a dim room beside a window",
  },
  {
    id: "research",
    title: "Research",
    text: "Academia, research careers and the slow, deliberate work of building a research profile that others notice.",
    includes: ["PhD and funding decisions", "Publishing and research visibility", "Academic and industry research roles"],
    cta: "Explore Research",
    href: "#specifics",
    image: "/images/specific-research.jpg",
    alt: "Readers standing before floor-to-ceiling library shelves",
  },
  {
    id: "growth",
    title: "Professional Growth",
    text: "The skills, visibility and development that carry a career forward, whatever the profession.",
    includes: ["Communication and presentation", "Professional presence online", "Planning the next move"],
    cta: "Explore Professional Growth",
    href: "#specifics",
    image: "/images/specific-growth.jpg",
    alt: "A hand sketching in a notebook",
  },
];

export const forthcoming = ["Law", "Design", "Medicine"];

export const formats = [
  { title: "Workshops", text: "Small, practical sessions on a single question, with exercises you leave having completed." },
  { title: "Webinars", text: "Talks and conversations with people working in the field, open to everyone at that stage." },
  { title: "Resources", text: "Guides, templates and reading lists that can be used at your own pace, between sessions." },
  { title: "Guidance", text: "Structured one-to-one support for decisions that need more than general advice." },
];

export type Article = {
  department: string;
  title: string;
  standfirst: string;
  image: string;
  alt: string;
  href: string;
};

// Placeholder editorial — replace with live Substack posts before launch.
export const articles: Article[] = [
  {
    department: "Decisions",
    title: "Why the first career decision feels so heavy, and why it matters less than you think",
    standfirst: "Early choices are rarely as permanent as they feel. What the research says about how careers actually unfold.",
    image: "/images/journal-walk.jpg",
    alt: "A person walking along a tree-lined street in spring",
    href: links.substack,
  },
  {
    department: "Psychology & Research",
    title: "The quiet craft of building a research profile",
    standfirst: "Visibility in academia is less about self-promotion than about consistency. A practical look at what compounds.",
    image: "/images/journal-laboratory.jpg",
    alt: "Archival photograph of a scientist at a laboratory bench",
    href: links.substack,
  },
  {
    department: "Work & Careers",
    title: "Changing careers at forty without starting again",
    standfirst: "Transferable skills are real, but they need translating. How to describe what you already know to a new field.",
    image: "/images/journal-letters.jpg",
    alt: "An older woman writing at a desk beside a window",
    href: links.substack,
  },
];

export const departments = ["Career Psychology", "Decisions", "Growth", "Psychology & Research", "Work & Careers"];

export const founder = {
  name: "Inaayat Khanna",
  role: "Psychologist and Founder",
};
