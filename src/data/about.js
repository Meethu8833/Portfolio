/* ---------------------------------------------------------------------------
   About section content + statistics.
   All prose is grounded in your resume; the stats are computed from resume
   facts (see comments). Edit here to update the About section anywhere.
--------------------------------------------------------------------------- */

// The intro paragraphs shown on the LEFT column. Each has a short heading so
// the section stays scannable for recruiters.
export const aboutIntro = [
  {
    heading: 'Professional profile',
    // Resume summary, verbatim.
    body: "I'm a software engineer with hands-on experience building backend and full-stack web applications using Python, FastAPI, and Django. I focus on designing REST APIs, relational data models, authentication systems, and asynchronous processing pipelines — with a track record of optimizing database performance and delivering scalable, well-tested applications in production.",
  },
  {
    heading: 'What I enjoy building',
    // Grounded in resume bullets (calculation engine, REST APIs, async jobs).
    body: 'I enjoy building secure, high-performance REST APIs and configurable, rule-based engines that handle complex multi-level business logic — with automated qualification, eligibility, and validation workflows, plus asynchronous and scheduled processing for large-scale jobs.',
  },
  {
    heading: 'My backend expertise',
    // Directly from the resume skills + experience.
    body: 'On the backend I work with FastAPI and Django, SQLAlchemy data models, complex and recursive SQL over high-volume MySQL data, transaction-safe database operations, and Celery for asynchronous and scheduled processing — all running as Dockerized services across development and production.',
  },
  {
    heading: 'Career objective',
    // "Open to opportunities" framing (your choice).
    body: "I'm open to impactful backend and full-stack engineering opportunities where I can design secure, scalable systems and take ownership of real-world business logic end to end.",
  },
];

/**
 * Statistic cards for the RIGHT column.
 * `value` is the number to count up to, `suffix` is appended after it, and
 * `display` (optional) overrides the number entirely for non-numeric cards
 * like "Current Position".
 *
 * How each value is derived from the resume:
 *  - Experience: Softroniics (Jun 2024) + IOSS (Feb 2025–present) ≈ 2 years.
 *  - Technologies: count of distinct tools in the resume skills section (~15).
 *  - Projects: the showcase projects listed in data/projects.js.
 *  - Position: current role/company from the resume.
 */
export const aboutStats = [
  { label: 'Years of Experience', value: 2, suffix: '+', icon: 'clock' },
  { label: 'Technologies', value: 15, suffix: '+', icon: 'stack' },
  { label: 'Projects', value: 3, suffix: '', icon: 'folder' },
  {
    label: 'Current Position',
    display: 'SWE', // shown instead of a counted number
    sublabel: 'Software Engineer @ IOSS',
    icon: 'briefcase',
  },
];
