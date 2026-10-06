// Single source of truth for Strive's content and architecture.
// Every section renders from this file, so a new profession, journal
// department or link is a data change — never a redesign.

export const links = {
  // Replace with the live URLs before launch.
  substack: "#journal",
  linkedin: "#about",
  contact: "#work-with-strive",
};

export const nav = [
  { href: "#model", label: "The Strive Model" },
  { href: "#specifics", label: "Strive Specifics" },
  { href: "#journal", label: "Journal" },
  { href: "#about", label: "About" },
];

export type Layer = {
  slug: string;
  verb: string;
  title: string;
  age: string;
  /** Position on the age axis. `null` = runs alongside every stage. */
  span: [number, number] | null;
  text: string;
  covers: string[];
  moment: string;
};

// The five layers are a permanent part of the brand architecture.
export const layers: Layer[] = [
  {
    slug: "decision",
    verb: "Choose",
    title: "The Decision Layer",
    age: "16–18",
    span: [16, 18],
    text: "Informed career decisions, made before a direction is chosen for you.",
    covers: ["Interests and strengths", "Subject and course choices", "First conversations about work"],
    moment: "choosing a direction.",
  },
  {
    slug: "build",
    verb: "Build",
    title: "The Build Layer",
    age: "18–25",
    span: [18, 25],
    text: "Turning direction into education, experience, skills and opportunity.",
    covers: ["Degrees and qualifications", "Internships and first roles", "Early professional networks"],
    moment: "building the foundations.",
  },
  {
    slug: "skill",
    verb: "Grow",
    title: "The Skill Layer",
    age: "25–35",
    span: [25, 35],
    text: "The professional skills, visibility and assets that let a career compound.",
    covers: ["Professional skills", "Visibility and reputation", "Portfolios and career assets"],
    moment: "growing into your work.",
  },
  {
    slug: "specifics",
    verb: "Specialise",
    title: "The Specifics",
    age: "Profession-specific",
    span: null,
    text: "Deep dives into a single profession, through workshops, webinars, resources and guidance.",
    covers: ["Workshops", "Webinars", "Resources and guidance"],
    moment: "going deeper in your field.",
  },
  {
    slug: "transition",
    verb: "Transition",
    title: "The Transition Layer",
    age: "40+",
    span: [40, 60],
    text: "Career change, reinvention, and the considered question of what comes next.",
    covers: ["Career change", "Reinvention", "What comes next"],
    moment: "starting something new.",
  },
];

/** The age axis the model is drawn on. */
export const axis = { from: 14, to: 60, labels: [16, 18, 25, 35, 40] };

/** Horizontal position of an age on the axis, as a percentage. */
export const agePct = (age: number) => ((age - axis.from) / (axis.to - axis.from)) * 100;

export type Specific = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  text: string;
  topics: string[];
  cta: string;
  /** Point at the vertical's own page once it exists. */
  href: string;
  art: "psychology" | "research" | "growth";
  tone: "navy" | "bone" | "paper";
};

// Launch verticals. Append an entry to add a profession.
export const specifics: Specific[] = [
  {
    id: "psychology",
    number: "01",
    title: "Psychology",
    subtitle: "Careers in the study of the mind",
    text: "Career paths, opportunities and professional growth for people building a life in psychology.",
    topics: ["Career paths", "Opportunities", "Growth"],
    cta: "Explore Psychology",
    href: "#specifics",
    art: "psychology",
    tone: "navy",
  },
  {
    id: "research",
    number: "02",
    title: "Research",
    subtitle: "Careers built on evidence",
    text: "Academia, research careers and the slow, deliberate work of building a research profile.",
    topics: ["Academia", "Research careers", "Research profile"],
    cta: "Explore Research",
    href: "#specifics",
    art: "research",
    tone: "bone",
  },
  {
    id: "growth",
    number: "03",
    title: "Professional Growth",
    subtitle: "For every field, at every stage",
    text: "The skills, visibility and development that carry a career forward, whatever the profession.",
    topics: ["Skills", "Visibility", "Development"],
    cta: "Explore Growth",
    href: "#specifics",
    art: "growth",
    tone: "paper",
  },
];

export const forthcoming = ["Law", "Design", "Medicine"];

export const journal = [
  { title: "Career Psychology", text: "How people choose, adapt and find meaning in their work." },
  { title: "Decisions", text: "Thinking clearly at the forks in the road that matter most." },
  { title: "Growth", text: "Skills, visibility and the long game of a working life." },
  { title: "Psychology & Research", text: "Dispatches from inside the fields Strive launches with." },
  { title: "Work & Careers", text: "Notes on the changing shape of work, and where it is heading." },
];

export const founder = {
  name: "Inaayat Khanna",
  role: "Psychologist and Founder",
  // Drop a monochrome portrait into /public and set its path here.
  // Until then the section renders a typographic frontispiece instead.
  portrait: null as string | null,
};
