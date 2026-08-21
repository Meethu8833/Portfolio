/* ---------------------------------------------------------------------------
   Projects.
   - The first entry is the AI Document Search RAG app (live on Vercel).
   - The second is the current IOSS commission-engine work, framed only from
     the resume bullets (nothing invented).
   - The third is an honest "Coming soon" placeholder.

   Link handling (no fabricated URLs):
     `github` / `demo` = null  → button renders disabled as "Coming soon".
     Fill in the real URLs here when you have them and the buttons activate.

   Media panel:
     `image` = a screenshot path in /public → the card shows the real shot.
     `image` = null → dotted placeholder canvas. Set `label` alongside it to
     print the project's own name on that canvas instead of the generic
     "project screenshot" caption (used for closed-source work with no shot).
--------------------------------------------------------------------------- */
export const projects = [
  {
    title: 'AI Document Search',
    description:
      'A full-stack RAG application that turns a document into something you can actually ask questions of. Uploads are validated, chunked on page boundaries, embedded locally with a BGE sentence-transformer, and upserted into a Pinecone vector index. Questions are answered from the retrieved passages only, with citations back to the source — so the model stays grounded in your document instead of guessing. Includes account auth and a free-question quota.',
    tech: ['Python', 'FastAPI', 'React', 'Pinecone', 'PostgreSQL'],
    image: '/ai-document-search.png',
    github: 'https://github.com/Meethu8833/AI_Document_Search',
    demo: 'https://ai-document-search-two.vercel.app/',
    featured: true,       // highlight styling for the flagship project
    comingSoon: false,
  },
  {
    title: 'Commission Calculation Engine',
    description:
      'A configurable, rule-based financial calculation engine handling multi-level business logic with automated qualification, eligibility, and validation workflows, plus Celery-based asynchronous and scheduled processing over high-volume MySQL data.',
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'MySQL', 'Celery', 'Docker'],
    image: null,
    label: 'Commission Calculation Engine', // closed source → name the canvas
    github: null,         // proprietary / internal work → no public link
    demo: null,
    featured: false,
    comingSoon: false,
  },
  {
    title: 'Alora Events',
    description:
      'A full-stack event and hall booking platform built with Python and Django, featuring role-based dashboards, automated double-booking conflict validation, and OTP-based password recovery. Includes full CRUD management with server-side form validation and pagination.',
    tech: ['Python', 'Django', 'MySQL', 'Bootstrap'],
    image: null,
    label: 'Alora Events',   // no screenshot on hand → name the canvas
    github: null,            // fill in the real URLs to activate the buttons
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
