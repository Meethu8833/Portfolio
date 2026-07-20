/* ---------------------------------------------------------------------------
   Work experience — both positions from your resume.
   Responsibilities are copied VERBATIM from the resume bullets. `tech` tags are
   drawn from the technologies named in those same bullets (nothing invented).
   Ordered most-recent first (the timeline renders top → bottom in this order).
--------------------------------------------------------------------------- */
export const experience = [
  {
    role: 'Software Engineer',
    company: 'Infinite Open Source Solutions LLP',
    period: 'Feb 2025 – Present',
    location: 'Kozhikode, Kerala',
    current: true, // drives the "Present" pulse indicator + accent styling
    responsibilities: [
      'Design and build secure, high-performance REST APIs in Python/FastAPI for scalable backend applications.',
      'Engineered a configurable, rule-based financial calculation engine handling multi-level business logic with automated qualification, eligibility, and validation workflows.',
      'Optimized SQLAlchemy data models, complex SQL, and recursive queries over high-volume transactional MySQL data, significantly reducing execution time.',
      'Implemented transaction-safe database operations, validation, and exception handling to guarantee data integrity and calculation accuracy.',
      'Introduced Celery-based asynchronous and scheduled processing for recurring operations and large-scale data jobs.',
      'Manage Dockerized services across development and production; lead root-cause analysis of concurrency, performance, and data-integrity issues.',
    ],
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'MySQL', 'Celery', 'Docker'],
  },
  {
    role: 'Python Full Stack Intern',
    company: 'Softroniics',
    period: 'Jun 2024 – Feb 2025',
    location: 'Kozhikode, Kerala',
    current: false,
    responsibilities: [
      'Built full-stack web applications with Django (MVT) and MySQL, with responsive React/Bootstrap frontends.',
      'Implemented complete CRUD features with secure server-side validation, authentication, and session management.',
      'Improved performance through query optimization, refactoring, and debugging; collaborated via Git and code reviews.',
    ],
    tech: ['Django', 'MySQL', 'React', 'Bootstrap', 'Git'],
  },
];
