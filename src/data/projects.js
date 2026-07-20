/* ---------------------------------------------------------------------------
   Projects.
   - The first entry is your resume project, verbatim.
   - The second is your current IOSS commission-engine work, framed only from
     your resume bullets (nothing invented).
   - The third is an honest "Coming soon" placeholder.

   Link handling (no fabricated URLs):
     `github` / `demo` = null  → button renders disabled as "Coming soon".
     Fill in the real URLs here when you have them and the buttons activate.

   `image` is null for now → the card shows a styled gradient placeholder with
   the project initials. Drop a screenshot into /public and set its path to use
   a real image.
--------------------------------------------------------------------------- */
export const projects = [
  {
    title: 'Identity Theft Detection System',
    description:
      'A Django and MySQL based web application using facial-recognition concepts to detect identity theft and support cyberbullying prevention.',
    tech: ['Python', 'Django', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    image: null,          // no screenshot yet → gradient placeholder
    github: null,         // no public link yet → "Coming soon"
    demo: null,
    featured: true,       // highlight styling for the flagship project
    comingSoon: false,
  },
  {
    title: 'Commission Calculation Engine',
    description:
      'A configurable, rule-based financial calculation engine handling multi-level business logic with automated qualification, eligibility, and validation workflows, plus Celery-based asynchronous and scheduled processing over high-volume MySQL data.',
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'MySQL', 'Celery', 'Docker'],
    image: null,
    github: null,         // proprietary / internal work → no public link
    demo: null,
    featured: false,
    comingSoon: false,
  },
  {
    title: 'More projects coming soon',
    description:
      'New work is in progress. Check back soon, or reach out to hear about what I’m currently building.',
    tech: [],
    image: null,
    github: null,
    demo: null,
    featured: false,
    comingSoon: true,     // renders the muted placeholder treatment
  },
];
